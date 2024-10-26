"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { getAllPost } from "@/actions/getAllPost";
import { deletePost } from "@/actions/deletePost";
import { useUser } from "@clerk/nextjs";
import { IPost } from "@/lib/models/post.model";
import Link from "next/link";

export default function BlogPosts() {
	const { user } = useUser();
	const [posts, setPosts] = useState<IPost[]>([]);

	useEffect(() => {
		if (user?.username) {
			fetchPosts();
		}
	}, [user?.username]);

	const fetchPosts = async () => {
		if (user?.username) {
			const fetchedPosts = await getAllPost({ author: user.username });
			setPosts(fetchedPosts);
		}
	};

	const handleDeletePost = async (username: string) => {
		await deletePost(username);
		fetchPosts();
	};

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold text-primary">Blog Posts</h1>
				<Link href="/dashboard/blog/create">
					<Button variant="secondary" className="rounded-full">
						<Plus className="mr-2 h-4 w-4" />
						New Post
					</Button>
				</Link>
			</div>

			<Card className="bg-background">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">Your Posts</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-primary">Title</TableHead>
								<TableHead className="text-primary">Date</TableHead>
								<TableHead className="text-right text-primary">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{posts.length > 0 ? (
								posts.map((post) => (
									<TableRow key={post.slug}>
										<TableCell className="font-medium">{post.title}</TableCell>
										<TableCell className="text-muted-foreground">
											{new Date(post.updatedAt).toISOString().split("T")[0]}
										</TableCell>
										<TableCell className="text-right">
											<Button variant="ghost" size="sm" className="mr-2">
												<Pencil className="h-4 w-4 text-primary" />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleDeletePost(post.author)}
											>
												<Trash2 className="h-4 w-4 text-destructive" />
											</Button>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={3} className="text-center">
										<div className="flex flex-col items-center justify-center py-8">
											<img
												src="https://cdn.pixabay.com/photo/2016/11/22/23/13/black-dog-1851106_1280.jpg"
												alt="No posts found"
												width={100}
												height={100}
												className="rounded-full aspect-square"
											/>
											<p className="mt-4 text-muted-foreground">
												No posts found
											</p>
										</div>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
