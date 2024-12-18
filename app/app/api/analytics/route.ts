import { connectToDB } from "@/lib/db";
import { Analytics } from "@/lib/models/analytics.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		await connectToDB();
		const data = await req.json();

		const analyticsData = new Analytics({
			username: data.username,
			eventType: data.eventType,
			sessionId: data.sessionId,
			url: data.url,
			path: data.path,
			referrer: data.referrer,
			browser: data.browser,
			location: data.location,
			performance: data.performance,
			timestamp: new Date(),
		});

		await analyticsData.save();
		return NextResponse.json({ success: true }, { status: 201 });
	} catch (error) {
		console.error("Error saving analytics:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to save analytics" },
			{ status: 500 }
		);
	}
}
