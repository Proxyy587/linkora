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
import dynamic from "next/dynamic";
import { generateWithGemini } from "@/actions/gemini";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { updatePost } from "@/actions/updatePost";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { IPost } from "@/lib/models/post.model";
import { JSONContent } from "novel";

const TailwindAdvancedEditor = dynamic(
	() => import("@/components/tailwind/advanced-editor"),
	{
		ssr: false,
	}
);

interface UpdateFormProps {
	post: IPost;
}

export default function UpdateForm({ post }: UpdateFormProps) {
	const [title, setTitle] = useState(post.title);
	const [slug, setSlug] = useState(post.slug);
	const [description, setDescription] = useState(post.description);
	const [content, setContent] = useState<JSONContent>(() => {
		try {
			return JSON.parse(post.content);
		} catch (error) {
			console.error("Failed to parse post content:", error);
			return {};
		}
	});
	const [headerImage, setHeaderImage] = useState(post.headerImage);
	const { user } = useUser();
	const router = useRouter();

	useEffect(() => {
		const generatedSlug = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)+/g, "");
		setSlug(generatedSlug);
	}, [title]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content || !title || !slug || !description || !headerImage) {
			toast.error("Please fill in all fields before updating.");
			return;
		}

		if (!user) {
			toast.error("Please sign in to update a post.");
			return;
		}

		const updatedPostData: Partial<IPost> = {
			title,
			slug,
			description,
			content: JSON.stringify(content),
			headerImage,
			updatedAt: new Date(),
		};

		try {
			const result = await updatePost(post.slug, updatedPostData);
			if (result.success) {
				console.log("Post updated:", result.post);
				toast.success("Post updated successfully!");
				router.push(`/dashboard/blog/${slug}`);
				router.refresh();
			} else {
				toast.error(`Failed to update post: ${result.error}`);
			}
		} catch (error: any) {
			console.error("Error updating post:", error);
			toast.error(`Failed to update post: ${error.message}`);
		}
	};

	const generateWithAI = async (
		field: "title" | "description",
		customPrompt: string
	) => {
		let prompt =
			field === "title"
				? `You need to generate a blog post title that is concise, engaging, and relevant to the topic. Use simple words and Avoid clickbait and ensure it accurately represents the content NO MARKDOWN NOTHING JUST WRITE PURE TEXT. Here is the user prompt: ${customPrompt}`
				: `You need to generate a brief, engaging blog post description that summarizes the main points and entices readers to learn more. Keep it under 200 characters. NO MARKDOWN NOTHING JUST WRITE PURE TEXT. Here is the user prompt: ${customPrompt}`;

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
			toast.error("Failed to generate content. Please try again.");
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
				<CardTitle className="text-3xl font-bold">Update Blog Post</CardTitle>
				<Button type="submit" size="lg" className="px-8" onClick={handleSubmit}>
					Update Post
				</Button>
			</CardHeader>
			<CardContent>
				<form className="space-y-6">
					{/* Title input */}
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

					{/* Slug input */}
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

					{/* Description input */}
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

					{/* Header Image upload */}
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<Label htmlFor="headerImage" className="text-lg font-semibold">
								Header Image
							</Label>
							<UploadButton
								endpoint="imageUploader"
								onClientUploadComplete={(res) => {
									console.log("Files: ", res);
									if (res && res.length > 0) {
										setHeaderImage(res[0].url);
									}
									toast.success("Header image uploaded successfully");
								}}
								onUploadError={(error: Error) => {
									console.error("Upload error:", error);
									toast.error(`Upload failed: ${error.message}`);
								}}
							/>
						</div>
						{headerImage ? (
							<div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
								<img
									src={headerImage}
									alt="Header"
									className="w-full h-auto aspect-video object-cover"
								/>
								<div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
									<Button
										variant="secondary"
										size="sm"
										onClick={() => setHeaderImage("")}
										className="text-white bg-red-500 hover:bg-red-600"
									>
										Remove Image
									</Button>
								</div>
							</div>
						) : (
							<div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
								<p className="text-gray-500 dark:text-gray-400">
									No header image uploaded
								</p>
							</div>
						)}
					</div>

					{/* Content editor */}
					<div className="space-y-2">
						<Label htmlFor="content">Content</Label>
						<TailwindAdvancedEditor
							onChange={(value) => {
								setContent(value);
							}}
							initialContent={content}
						/>
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
			toast.error("Please enter a custom prompt before generating.");
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
