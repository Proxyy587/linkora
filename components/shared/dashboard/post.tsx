"use client";

import React, { useState } from "react";
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

export default function BlogPosts() {
	const [posts, setPosts] = React.useState([
		{
			id: 1,
			title: "My First Blog Post",
			status: "Published",
			date: "2023-04-01",
		},
		{
			id: 2,
			title: "How to Use LinkHub Effectively",
			status: "Draft",
			date: "2023-04-15",
		},
		{
			id: 3,
			title: "Top 10 Social Media Tips",
			status: "Published",
			date: "2023-05-01",
		},
	]);

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold text-primary">Blog Posts</h1>
				<Button variant="outline">
					<Plus className="mr-2 h-4 w-4" />
					New Post
				</Button>
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
								<TableHead className="text-primary">Status</TableHead>
								<TableHead className="text-primary">Date</TableHead>
								<TableHead className="text-right text-primary">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{posts.map((post) => (
								<TableRow key={post.id}>
									<TableCell className="font-medium">{post.title}</TableCell>
									<TableCell className="text-muted-foreground">
										{post.status}
									</TableCell>
									<TableCell className="text-muted-foreground">
										{post.date}
									</TableCell>
									<TableCell className="text-right">
										<Button variant="ghost" size="sm" className="mr-2">
											<Pencil className="h-4 w-4 text-primary" />
										</Button>
										<Button variant="ghost" size="sm">
											<Trash2 className="h-4 w-4 text-destructive" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
