import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/db";

export async function saveUserToDatabase(userData: any) {
	try {
		await connectToDB();

		const newUser = new User({
			name: userData.name,
			username: userData.username,
			email: userData.email,
			image: userData.image,
		});

		await newUser.save();
		console.log("User saved successfully");
	} catch (error) {
		console.error("Error saving user to database:", error);
		throw error;
	}
}
