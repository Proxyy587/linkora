"use server";

import Post, { IPost } from "@/lib/models/post.model";
import { revalidatePath } from "next/cache";

export const savePost = async (post: IPost) => {
	try {
		// Log the entire post object to see what's being received
		console.log("Received post data:", post);

		// Ensure all required fields are present
		if (!post.title || !post.slug || !post.description || !post.content || !post.headerImage || !post.author) {
			throw new Error("Missing required fields");
		}

		const newPost = await Post.create({
			title: post.title,
			slug: post.slug,
			description: post.description,
			content: post.content,
			headerImage: post.headerImage,
			author: post.author,
		});

		console.log("Saved post:", newPost);

		revalidatePath('/blog');
		return { success: true, post: newPost };
	} catch (error: any) {
		console.error("Error saving post:", error);
		return { success: false, error: error.message };
	}
};
