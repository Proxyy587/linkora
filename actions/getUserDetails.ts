"use server";

import { connectToDB } from "@/lib/db";
import User, { IUserData } from "@/lib/models/user.model";

export async function getUserByEmail(email: string): Promise<IUserData | null> {
	try {
		await connectToDB();

		let user = await User.findOne({ email });

		if (!user) {
			user = new User({
				email,
				name: "",
				username: "",
				templateTheme: "modern",
				socialLinks: {},
			});
			await user.save();
			console.log("New user created in the database");
		}

		// Convert Mongoose document to a plain JavaScript object
		return user.toObject();
	} catch (error) {
		console.error("Error fetching or creating user in database:", error);
		throw error;
	}
}
