"use server";

// Outdated
// import { clerkClient } from "@clerk/clerk-sdk-node";
import { createClerkClient } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
	secretKey: process.env.CLERK_SECRET_KEY,
});

export async function getUserByEmail(username: string) {
	try {
		const userList = await clerkClient.users.getUserList();
		const owner = userList.data.find((user) => user.username === username);

		if (!owner) {
			console.log(`User with username ${username} not found`);
			return null;
		}

		return {
			id: owner.id,
			username: owner.username,
			firstName: owner.firstName,
			lastName: owner.lastName,
		};
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
}
