import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface TrackPayload {
  domain: string;
  url: string;
  event: string;
  source?: string;
}

export async function OPTIONS(request: Request): Promise<NextResponse> {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const payload = await req.json() as TrackPayload;
    const { domain, url, event, source } = payload;

    if (!url.includes(domain)) {
      return NextResponse.json(
        {
          error: "The script points to a different domain than the current url. Make sure they match",
        },
        { headers: corsHeaders }
      );
    }

    await client.connect();
    const db = client.db("analytics");

    if (event === "session_start") {
      // Log new visit with source
      await db.collection("visits").insertOne({
        website_id: domain,
        source: source ?? "Direct",
        created_at: new Date()
      });
    }

    if (event === "pageview") {
      await db.collection("page_views").insertOne({
        domain,
        page: url,
        created_at: new Date()
      });
    }

    await client.close();
    return NextResponse.json({ success: true }, { headers: corsHeaders });

  } catch (error) {
    await client.close();
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}