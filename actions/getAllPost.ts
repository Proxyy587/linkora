"use server";

import Post from "@/lib/models/post.model";

export const getAllPost = async ({ author }: { author: string }) => {
	if (!author) return [];
	const posts = await Post.find({ author });
	return posts;
};
