"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Wand2 } from "lucide-react";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";

export default function CreateForm() {
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [description, setDescription] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		const generatedSlug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)+/g, "");
		setSlug(generatedSlug);
	}, [title]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ title, slug, description, content });
		// Handle form submission
	};

	const generateWithAI = async (field: "title" | "description") => {
		await new Promise((resolve) => setTimeout(resolve, 1500));
		const generatedContent = `AI generated ${field} content.`;
		if (field === "title") {
			setTitle(generatedContent);
		} else if (field === "description") {
			setDescription(generatedContent);
		}
	};

	const generateSlug = () => {
		const generatedSlug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)+/g, "");
		setSlug(generatedSlug);
	};

	return (
		<Card className="w-full max-w-7xl mx-auto shadow-lg">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-3xl font-bold">
					Create New Blog Post
				</CardTitle>
				<Button type="submit" size="lg" className="px-8" onClick={handleSubmit}>
					Publish Post
				</Button>
			</CardHeader>
			<CardContent>
				<form className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<div className="flex space-x-2">
							<Input
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="Enter your captivating title"
								className="flex-grow"
							/>
							<AIGenerateButton onClick={() => generateWithAI("title")} />
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="slug">Slug</Label>
						<div className="flex space-x-2">
							<Input
								id="slug"
								value={slug}
								onChange={(e) => setSlug(e.target.value)}
								placeholder="your-post-slug"
								className="flex-grow"
							/>
							<Button onClick={generateSlug} type="button">
								Generate
							</Button>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<div className="flex space-x-2">
							<Textarea
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Write a brief, engaging description"
								className="flex-grow"
							/>
							<AIGenerateButton onClick={() => generateWithAI("description")} />
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="content">Content</Label>
						<TailwindAdvancedEditor />
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

function AIGenerateButton({ onClick }: { onClick: () => void }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button type="button" size="icon" variant="outline">
					<Wand2 className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate with AI</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					<p className="text-sm text-zinc-500 dark:text-zinc-400">
						Click the button below to generate content using AI. This will
						replace the current content in the field.
					</p>
				</div>
				<Button onClick={onClick} className="w-full">
					Generate Content
				</Button>
			</DialogContent>
		</Dialog>
	);
}
