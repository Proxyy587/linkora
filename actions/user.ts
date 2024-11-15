"use server";

import { connectToDB } from "@/lib/db";
import User from "@/lib/models/user.model";
import { currentUser } from "@clerk/nextjs/server";

export const authenticateUser = async () => {
	const user = await currentUser();
	if (!user) {
		return { status: 403 };
	}
	await connectToDB();

	const userExist = await User.findOne({
		username: user.username,
	});

	if (userExist) {
		return { status: 200, user: userExist };
	}

	try {
		const newUser = new User({
			name: user.fullName || "",
			username: user.username || "",
			contact: {
				email: user.primaryEmailAddress?.emailAddress || "",
			},
			image: user.imageUrl || "",
		});
		await newUser.save();
		return { status: 201, user: newUser };
	} catch (error) {
		return { status: 500 };
	}
};
