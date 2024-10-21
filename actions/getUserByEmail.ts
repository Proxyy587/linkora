"use server";

import { clerkClient } from "@clerk/clerk-sdk-node";

export async function getUserByEmail(username: string) {
	try {
		const userList = await clerkClient.users.getUserList();
		const ownerList = userList.data.find((i: any) => i.username === username);
		return ownerList;
	} catch (error) {
		console.log(error);
	}
}
