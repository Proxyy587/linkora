import { MongoClient, ObjectId } from "mongodb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface EventPayload {
	name: string;
	domain: string;
	description?: string;
}

export async function OPTIONS(request: Request): Promise<NextResponse> {
	return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request): Promise<NextResponse> {
	try {
		const user = await currentUser();

		if (!user) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401, headers: corsHeaders }
			);
		}

		const payload = (await req.json()) as EventPayload;
		const { name, domain, description } = payload;

		if (!name?.trim() || !domain?.trim()) {
			return NextResponse.json(
				{ error: "name or domain fields must not be empty." },
				{ status: 400, headers: corsHeaders }
			);
		}

		await client.connect();
		const db = client.db("analytics");
		const events = db.collection("events");

		const result = await events.insertOne({
			event_name: name.toLowerCase(),
			website_id: domain,
			message: description,
			username: user.username,
			created_at: new Date(),
		});

		await client.close();

		if (!result.acknowledged) {
			return NextResponse.json(
				{ error: "Failed to create event" },
				{ status: 400, headers: corsHeaders }
			);
		}

		return NextResponse.json(
			{ message: "success" },
			{ status: 200, headers: corsHeaders }
		);
	} catch (error) {
		await client.close();
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Internal server error",
			},
			{ status: 500, headers: corsHeaders }
		);
	}
}
