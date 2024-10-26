"use server";

import Post, { IPost } from "@/lib/models/post.model";
import { revalidatePath } from "next/cache";

export const updatePost = async (
	oldSlug: string,
	updatedPost: Partial<IPost>
) => {
	try {
		const post = await Post.findOneAndUpdate({ slug: oldSlug }, updatedPost, {
			new: true,
		});
		if (!post) {
			throw new Error("Post not found");
		}
		revalidatePath("/dashboard/blog");
		revalidatePath(`/dashboard/blog/${oldSlug}`);
		revalidatePath(`/dashboard/blog/${updatedPost.slug}`);
		return { success: true, post };
	} catch (error: any) {
		console.error("Error updating post:", error);
		return { success: false, error: error.message };
	}
};
