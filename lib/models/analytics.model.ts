import mongoose from "mongoose";

export interface IAnalytics {
	username: string;
	timestamp: Date;
	eventType: string;
	sessionId: string;
	url: string;
	path: string;
	referrer: string;
	browser: {
		userAgent: string;
		language: string;
		platform: string;
		screenResolution: string;
		viewportSize: string;
	};
	location: {
		country: string;
		city: string;
		region: string;
		ip: string;
	};
	performance: {
		loadTime: number;
		domReadyTime: number;
	};
}

const analyticsSchema = new mongoose.Schema<IAnalytics>({
	username: { type: String, required: true, index: true },
	timestamp: { type: Date, default: Date.now },
	eventType: { type: String, required: true },
	sessionId: { type: String, required: true },
	url: String,
	path: String,
	referrer: String,
	browser: {
		userAgent: String,
		language: String,
		platform: String,
		screenResolution: String,
		viewportSize: String,
	},
	location: {
		country: String,
		city: String,
		region: String,
		ip: String,
	},
	performance: {
		loadTime: Number,
		domReadyTime: Number,
	},
});

export const Analytics =
	mongoose.models.Analytics || mongoose.model("Analytics", analyticsSchema);
