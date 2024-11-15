"use server";

import { connectToDB } from "@/lib/db";
import User from "@/lib/models/user.model";
import { IUserData } from "@/lib/models/user.model";

export async function saveUserInfo(
	username: string,
	userInfo: IUserData
): Promise<IUserData> {
	try {
		await connectToDB();

		const updatedUser = await User.findOneAndUpdate(
			{ username },
			{
				$set: {
					name: userInfo.name,
					username: userInfo.username,
					contact: {
						email: userInfo.contact?.email || "",
						phone: userInfo.contact?.phone || "",
					},
					title: userInfo.title,
					description: userInfo.description,
					status: userInfo.status,
					bio: userInfo.bio,
					templateTheme: userInfo.templateTheme,
					socialLinks: userInfo.socialLinks,
					education: userInfo.education,
					experience: userInfo.experience,
					personality: userInfo.personality,
					position: userInfo.position,
					profile_links: userInfo.profile_links,
					projects: userInfo.projects,
					image: userInfo.image,
					resume: userInfo.resume,
					role: userInfo.role,
					technological_skills: userInfo.technological_skills,
				},
			},
			{ new: true, upsert: true }
		);

		if (!updatedUser) {
			throw new Error("User not found or update failed");
		}

		console.log("User info saved successfully");
		return updatedUser.toObject();
	} catch (error) {
		console.error("Error saving user info to database:", error);
		throw error;
	}
}
