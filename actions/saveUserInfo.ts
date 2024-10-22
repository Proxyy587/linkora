"use server";

import { connectToDB } from "@/lib/db";
import User from "@/lib/models/user.model";
import { IUserData } from "@/lib/models/user.model";

export async function saveUserInfo(
	email: string,
	userInfo: Partial<IUserData>
) {
	try {
		await connectToDB();

		const updatedUser = await User.findOneAndUpdate(
			{ email },
			{
				$set: {
					name: userInfo.name,
					username: userInfo.username,
					email: userInfo.email,
					title: userInfo.title,
					description: userInfo.description,
					status: userInfo.status,
					bio: userInfo.bio,
					templateTheme: userInfo.templateTheme,
					socialLinks: userInfo.socialLinks,
				},
			},
			{ new: true, upsert: true }
		);

		if (!updatedUser) {
			throw new Error("User not found or update failed");
		}

		console.log("User info saved successfully");
		// Convert Mongoose document to a plain JavaScript object
		return updatedUser.toObject();
	} catch (error) {
		console.error("Error saving user info to database:", error);
		throw error;
	}
}
