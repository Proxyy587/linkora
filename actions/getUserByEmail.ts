"use server";

import { createClerkClient } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/db";
import User, { IUserData } from "@/lib/models/user.model";

const clerkClient = createClerkClient({
	secretKey: process.env.CLERK_SECRET_KEY,
});

export async function getUserByEmail(
	username: string
): Promise<IUserData | null> {
	try {
		await connectToDB();

		const userList = await clerkClient.users.getUserList();
		const clerkUser = userList.data.find((user) => user.username === username);

		if (!clerkUser) {
			console.log(`User with username ${username} not found in Clerk`);
			return null;
		}

		let user = await User.findOne({ username: clerkUser.username });

		if (!user) {
			return null;
		}

		return user.toObject();
	} catch (error) {
		console.error("Error fetching or creating user:", error);
		throw error;
	}
}
