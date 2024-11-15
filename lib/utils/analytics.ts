import { Analytics } from "@/lib/models/analytics.model";

export async function getAnalytics(username: string) {
	const now = new Date();
	const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
	const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

	try {
		const [
			totalViews,
			monthlyViews,
			weeklyViews,
			uniqueVisitors,
			countries,
			pageViews,
		] = await Promise.all([
			Analytics.countDocuments({ username, eventType: "pageview" }),
			Analytics.countDocuments({
				username,
				eventType: "pageview",
				timestamp: { $gte: thirtyDaysAgo },
			}),
			Analytics.countDocuments({
				username,
				eventType: "pageview",
				timestamp: { $gte: sevenDaysAgo },
			}),
			Analytics.distinct("sessionId", { username }),
			Analytics.aggregate([
				{ $match: { username } },
				{
					$group: {
						_id: "$location.country",
						count: { $sum: 1 },
					},
				},
				{ $sort: { count: -1 } },
				{ $limit: 5 },
			]),
			Analytics.aggregate([
				{ $match: { username } },
				{
					$group: {
						_id: "$path",
						views: { $sum: 1 },
					},
				},
				{ $sort: { views: -1 } },
				{ $limit: 10 },
			]),
		]);

		const response = {
			totalViews: totalViews || 0,
			monthlyViews: monthlyViews || 0,
			weeklyViews: weeklyViews || 0,
			uniqueVisitors: uniqueVisitors?.length || 0,
			countries: countries || [],
			pageViews: pageViews || [],
		};

		return JSON.stringify(response);
	} catch (error) {
		console.error("Error fetching analytics:", error);
		return JSON.stringify({
			totalViews: 0,
			monthlyViews: 0,
			weeklyViews: 0,
			uniqueVisitors: 0,
			countries: [],
			pageViews: [],
		});
	}
}
