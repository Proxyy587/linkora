"use server";

import { connectToDB } from "@/lib/db";
import User from "@/lib/models/user.model";

export async function removeSocialLink(email: string, platform: string) {
  try {
    await connectToDB();

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $unset: { [`socialLinks.${platform}`]: "" } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    console.log("Social link removed successfully");
    return updatedUser.socialLinks.toObject();
  } catch (error) {
    console.error("Error removing social link from database:", error);
    throw error;
  }
}
