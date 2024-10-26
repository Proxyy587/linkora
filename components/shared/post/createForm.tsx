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
import { Wand2, Loader2 } from "lucide-react";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { generateWithGemini } from "@/actions/gemini";
import { toast } from "sonner";

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

	const generateWithAI = async (
		field: "title" | "description",
		customPrompt: string
	) => {
		let prompt =
			field === "title"
				? `You need to generate a blog post title that is concise, engaging, and relevant to the topic. Use simple words and Avoid clickbait and ensure it accurately represents the content. Here is the user prompt: ${customPrompt}`
				: `You need to generate a brief, engaging blog post description that summarizes the main points and entices readers to learn more. Keep it under 200 characters. Here is the user prompt: ${customPrompt}`;

		try {
			const generatedContent = await generateWithGemini(prompt);
			if (field === "title") {
				setTitle(generatedContent);
			} else if (field === "description") {
				setDescription(generatedContent);
			}
			return true;
		} catch (error) {
			console.error("Error generating content:", error);
			toast({
				title: "Error",
				description: "Failed to generate content. Please try again.",
				variant: "destructive",
			});
			return false;
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
							<AIGenerateButton
								onGenerate={(prompt) => generateWithAI("title", prompt)}
							/>
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
							<AIGenerateButton
								onGenerate={(prompt) => generateWithAI("description", prompt)}
							/>
						</div>
						<p className="text-xs text-muted-foreground">
							NOTE: this will be used for socials and google metadata
						</p>
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

function AIGenerateButton({
	onGenerate,
}: {
	onGenerate: (prompt: string) => Promise<boolean>;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [customPrompt, setCustomPrompt] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleGenerate = async () => {
		if (!customPrompt.trim()) {
			toast({
				title: "Error",
				description: "Please enter a custom prompt before generating.",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);
		const success = await onGenerate(customPrompt);
		setIsLoading(false);

		if (success) {
			setIsOpen(false);
			setCustomPrompt("");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button type="button" size="icon" variant="outline">
					<Wand2 className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate with AI</DialogTitle>
				</DialogHeader>
				<div className="py-4 space-y-4">
					<p className="text-sm text-zinc-500 dark:text-zinc-400">
						Enter a custom prompt to guide the AI in generating content.
					</p>
					<Textarea
						value={customPrompt}
						onChange={(e) => setCustomPrompt(e.target.value)}
						placeholder="E.g., Generate a catchy title for a blog post about AI in healthcare"
						className="w-full"
					/>
				</div>
				<Button
					onClick={handleGenerate}
					className="w-full"
					disabled={isLoading || !customPrompt.trim()}
				>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Generating...
						</>
					) : (
						"Generate Content"
					)}
				</Button>
			</DialogContent>
		</Dialog>
	);
}
