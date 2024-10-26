"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateWithGemini(prompt: string): Promise<string> {
	try {
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		return text;
	} catch (error) {
		console.error("Error generating content with Gemini:", error);
		throw new Error("Failed to generate content");
	}
}
