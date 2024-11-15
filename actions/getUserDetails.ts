"use server";

import { connectToDB } from "@/lib/db";
import User, { IUserData } from "@/lib/models/user.model";

export async function getUserAndSaveEmail(
	email: string
): Promise<IUserData | null> {
	try {
		await connectToDB();

		let user = await User.findOne({ email });

		if (!user) {
			user = new User({
				contact: { email },
			});
			await user.save();
			console.log("New user created in the database");
		}

		return user.toObject();
	} catch (error) {
		console.error("Error fetching or creating user in database:", error);
		throw error;
	}
}
