"use server";

import Post from "@/lib/models/post.model";

export const deletePost = async (id: string) => {
	const deletedPost = await Post.findByIdAndDelete(id);
	return deletedPost;
};
