"use server";

import Post from "@/lib/models/post.model";

export const getPostbySlug = async (slug: string) => {
	const post = await Post.findOne({ slug });
	return post;
};
