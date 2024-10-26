import React from "react";
import { getPostbySlug } from "@/actions/getPostbySlug";
import BlogPostForm from "@/components/shared/post/createForm";

const UpdatePostPage = async ({ params }: { params: { slug: string } }) => {
	const post = await getPostbySlug(params.slug);
	return <BlogPostForm post={post} mode="update" />;
};

export default UpdatePostPage;
