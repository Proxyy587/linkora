import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	username: string;
	email: string;
	image?: string;
	description?: string;
	bio?: string;
	status: "active" | "inactive" | "busy";
	templateTheme: string;
	socialLinks: Record<string, string>;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		image: { type: String },
		description: { type: String },
		bio: { type: String },
		status: {
			type: String,
			enum: ["active", "inactive", "busy"],
			default: "active",
		},
		templateTheme: { type: String, default: "default" },
		socialLinks: { type: Map, of: String },
	},
	{ timestamps: true }
);

export default mongoose.models.User ||
	mongoose.model<IUser>("User", UserSchema);