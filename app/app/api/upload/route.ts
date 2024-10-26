import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  console.log("Upload API route hit");

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("Missing BLOB_READ_WRITE_TOKEN");
    return new Response("Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.", {
      status: 401,
    });
  }

  try {
    const file = await req.blob();
    const filename = req.headers.get("x-vercel-filename") || "file.txt";
    const contentType = req.headers.get("content-type") || "text/plain";
    const fileType = `.${contentType.split("/")[1]}`;

    const finalName = filename.includes(fileType) ? filename : `${filename}${fileType}`;
    const blob = await put(finalName, file, {
      contentType,
      access: "public",
    });

    console.log("File uploaded successfully:", blob.url);
    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error in upload API route:", error);
    return new Response(`Error uploading file: ${error.message}`, { status: 500 });
  }
}
