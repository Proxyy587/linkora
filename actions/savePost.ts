"use server";

import Post, { IPost } from "@/lib/models/post.model";

export const savePost = async (post: IPost) => {
	const newPost = await Post.create(post);
	return newPost;
};
