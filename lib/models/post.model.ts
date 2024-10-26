import mongoose, { Document, Schema } from "mongoose";

export interface IPost {
	title: string;
	slug: string;
	headerImage: string;
	description: string;
	content: string;
	author: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IPostDocument extends IPost, Document {}

const PostSchema: Schema = new Schema<IPostDocument>(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true, unique: true },
		headerImage: { type: String, required: true },
		description: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.models.Post ||
	mongoose.model<IPostDocument>("Post", PostSchema);
