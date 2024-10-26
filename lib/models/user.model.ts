import mongoose, { Schema, Document } from "mongoose";

export interface IUserData {
	name: string;
	username: string;
	email: string;
	image?: string;
	title?: string;
	description?: string;
	bio?: string;
	status?: string;
	templateTheme: string;
	socialLinks?: {
		[key: string]: string;
	};
}

export interface IUserDocument extends IUserData, Document {}

const UserSchema: Schema = new Schema<IUserDocument>(
	{
		name: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		image: { type: String },
		title: { type: String },
		description: { type: String },
		bio: { type: String },
		status: { type: String },
		templateTheme: { type: String, default: "modern" },
		socialLinks: { type: Map, of: String },
	},
	{ timestamps: true }
);

export default mongoose.models.User ||
	mongoose.model<IUserDocument>("User", UserSchema);
