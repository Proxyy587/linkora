import { connectToDB } from "@/lib/db";
import { Analytics } from "@/lib/models/analytics.model";

export async function GET(req: Request) {
	const url = new URL(req.url);
	const username = url.searchParams.get("username");

	if (!username) {
		return new Response(JSON.stringify({ error: "Username is required" }), {
			status: 400,
		});
	}

	try {
		await connectToDB();
		const now = new Date();
		const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

		const [totalViews, monthlyViews, uniqueVisitors, topPaths, countries] =
			await Promise.all([
				Analytics.countDocuments({ username }),
				Analytics.countDocuments({
					username,
					timestamp: { $gte: thirtyDaysAgo },
				}),
				Analytics.distinct("sessionId", { username }),
				Analytics.aggregate([
					{ $match: { username } },
					{ $group: { _id: "$path", views: { $sum: 1 } } },
					{ $sort: { views: -1 } },
					{ $limit: 10 },
				]),
				Analytics.aggregate([
					{ $match: { username } },
					{ $group: { _id: "$location.country", count: { $sum: 1 } } },
					{ $sort: { count: -1 } },
					{ $limit: 5 },
				]),
			]);

		return new Response(
			JSON.stringify({
				totalViews,
				monthlyViews,
				uniqueVisitors: uniqueVisitors.length,
				topPaths,
				countries,
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching analytics:", error);
		return new Response(
			JSON.stringify({ error: "Failed to fetch analytics" }),
			{ status: 500 }
		);
	}
}
