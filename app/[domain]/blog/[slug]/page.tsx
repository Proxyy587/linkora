import React from "react";
import { notFound } from "next/navigation";
import { getUserByEmail } from "@/actions/getUserByEmail";
import { IUserData } from "@/lib/models/user.model";
import { Navbar } from "../../_components/minimalistic/nav";
import Footer from "../../_components/minimalistic/footer";
import { getPostbySlug } from "@/actions/getPostbySlug";
import { IPost } from "@/lib/models/post.model";

export async function generateMetadata({
	params,
}: {
	params: { slug: string; domain: string };
}) {
	const { slug, domain } = params;
	const post = await getPostbySlug(slug);
	const domainParts = domain.split(".");
	const owner = (await getUserByEmail(domainParts[0])) as IUserData;
	return {
		title: post?.title || slug,
		description: post?.description || `Blog Post from ${owner.username}`,
	};
}

const BlogPage = async ({
	params,
}: {
	params: { slug: string; domain: string };
}) => {
	const { domain, slug } = params;

	const domainParts = domain.split(".");
	const owner = (await getUserByEmail(domainParts[0])) as IUserData;
	const post = (await getPostbySlug(slug)) as IPost;

	if (!post || !owner) {
		return notFound();
	}

	const renderContent = (content: any) => {
		if (!content) return null;

		return content.content.map((node: any, index: number) => {
			switch (node.type) {
				case "heading":
					switch (node.attrs.level) {
						case 1:
							return (
								<h1 key={index} className="text-3xl font-bold my-4">
									{node.content?.map((textNode: any, i: number) => textNode.text).join("")}
								</h1>
							);
						case 2:
							return (
								<h2 key={index} className="text-2xl font-bold my-4">
									{node.content?.map((textNode: any, i: number) => textNode.text).join("")}
								</h2>
							);
						case 3:
							return (
								<h3 key={index} className="text-xl font-bold my-4">
									{node.content?.map((textNode: any, i: number) => textNode.text).join("")}
								</h3>
							);
						default:
							return null;
					}
				case "paragraph":
					return (
						<p key={index} className="mb-4">
							{node.content?.map((textNode: any, i: number) => {
								if (textNode.type === "text") {
									return <span key={i}>{textNode.text}</span>;
								}
								if (textNode.type === "hardBreak") {
									return <br key={i} />;
								}
								return null;
							})}
						</p>
					);
				case "bulletList":
					return (
						<ul key={index} className="list-disc list-inside space-y-2 my-4">
							{node.content?.map((listItem: any, i: number) => (
								<li key={i}>
									{listItem.content?.map((pNode: any, j: number) =>
										pNode.content?.map((textNode: any, k: number) => textNode.text).join("")
									)}
								</li>
							))}
						</ul>
					);
				case "orderedList":
					return (
						<ol key={index} className="list-decimal list-inside space-y-2 my-4">
							{node.content?.map((listItem: any, i: number) => (
								<li key={i}>
									{listItem.content?.map((pNode: any, j: number) =>
										pNode.content?.map((textNode: any, k: number) => textNode.text).join("")
									)}
								</li>
							))}
						</ol>
					);
				case "taskList":
					return (
						<ul key={index} className="list-none space-y-2 my-4">
							{node.content?.map((taskItem: any, i: number) => (
								<li key={i} className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={taskItem.attrs.checked}
										readOnly
										className="h-4 w-4"
									/>
									<span>{taskItem.content[0].content[0].text}</span>
								</li>
							))}
						</ul>
					);
				case "blockquote":
					return (
						<blockquote key={index} className="border-l-4 border-gray-300 pl-4 my-4">
							{node.content?.map((pNode: any, i: number) =>
								pNode.content?.map((textNode: any, j: number) => textNode.text).join("")
							)}
						</blockquote>
					);
				case "codeBlock":
					return (
						<pre key={index} className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
							<code>{node.content?.map((textNode: any) => textNode.text).join("")}</code>
						</pre>
					);
				case "image":
					return (
						<img
							key={index}
							src={node.attrs.src}
							alt={node.attrs.alt || ""}
							className="my-4 rounded-lg max-w-full"
						/>
					);
				case "youtube":
					return (
						<div key={index} className="relative pb-[56.25%] h-0 my-4">
							<iframe
								src={`https://www.youtube.com/embed/${node.attrs.src}`}
								className="absolute top-0 left-0 w-full h-full rounded-lg"
								allowFullScreen
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							/>
						</div>
					);
				case "tweet":
					return (
						<div key={index} className="my-4">
							<a 
								href={`https://twitter.com/x/status/${node.attrs.id}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 hover:underline"
							>
								View Tweet
							</a>
						</div>
					);
				default:
					return null;
			}
		});
	};

	return (
		<div className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
			<main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
				<Navbar />
				<article className="flex flex-col gap-8">
					<header>
						{post.headerImage && (
							<img
								src={post.headerImage}
								alt={post.title}
								className="w-full h-[300px] object-cover rounded-lg mb-8"
							/>
						)}
						<h1 className="font-semibold text-2xl tracking-tighter">
							{post.title}
						</h1>
						<div className="flex flex-col md:flex-row gap-2 md:items-center text-sm text-neutral-600 dark:text-neutral-400">
							<time dateTime={post.createdAt.toString()}>
								{new Date(post.createdAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</time>
						</div>
					</header>
					<div className="prose dark:prose-invert">
						{renderContent(JSON.parse(post.content))}
					</div>
				</article>
				<Footer />
			</main>
		</div>
	);
};

export default BlogPage;
