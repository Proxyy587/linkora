import Link from "next/link";
import { getAllPost } from "@/actions/getAllPost";
import { IPost } from "@/lib/models/post.model";

export async function BlogPosts({ username, limit }: { username: string; limit?: number }) {
	const allBlogs: IPost[] = await getAllPost({ author: username });

	const displayBlogs = limit ? allBlogs.slice(0, limit) : allBlogs;

	return (
		<div>
			{displayBlogs
				.sort((a, b) => {
					if (new Date(a.createdAt) > new Date(b.createdAt)) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
					<Link
						key={post.slug}
						className="flex flex-col space-y-1 mb-4"
						href={`/${username}/blog/${post.slug}`}
					>
						<div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
							<p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
								{formatDate(post.createdAt.toString(), false)}
							</p>
							<p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
								{post.title}
							</p>
						</div>
					</Link>
				))}
		</div>
	);
}

function formatDate(dateString: string, includeTime: boolean = false): string {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	if (includeTime) {
		options.hour = "2-digit";
		options.minute = "2-digit";
	}
	return date.toLocaleDateString("en-US", options);
}
