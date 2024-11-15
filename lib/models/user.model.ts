import mongoose, { Schema, Document } from "mongoose";

export interface IUserData {
	name: string;
	username: string;
	contact?: {
		email: string;
		phone: string;
	};
	education?: {
		dates: string;
		degree: string;
		institution: string;
	}[];
	experience?: {
		company: string;
		description: string;
		duration: string;
		job_title: string;
		skills: string;
	}[];
	personality?: string[];
	position?: string;
	profile_links?: string[];
	projects?: {
		description: string;
		link: string | null;
		outcome: string;
		technologies: string;
		title: string;
	}[];
	image?: string;
	title?: string;
	description?: string;
	resume?: string;
	role?: string;
	technological_skills?: string | null;
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
		contact: {
			email: { type: String, required: true },
			phone: { type: String },
		},
		education: [
			{
				dates: { type: String },
				degree: { type: String },
				institution: { type: String },
			},
		],
		experience: [
			{
				company: { type: String },
				description: { type: String },
				duration: { type: String },
				job_title: { type: String },
				skills: { type: String },
			},
		],
		personality: [{ type: String }],
		position: { type: String },
		profile_links: [{ type: String }],
		projects: [
			{
				description: { type: String },
				link: { type: String, default: null },
				outcome: { type: String },
				technologies: { type: String },
				title: { type: String },
			},
		],
		image: { type: String },
		title: { type: String },
		description: { type: String },
		resume: { type: String },
		role: { type: String },
		technological_skills: { type: String, default: null },
		bio: { type: String },
		status: { type: String },
		templateTheme: { type: String, default: "minimalist" },
		socialLinks: { type: Map, of: String },
	},
	{ timestamps: true }
);

export default mongoose.models.User ||
	mongoose.model<IUserDocument>("User", UserSchema);
