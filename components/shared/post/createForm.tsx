"use client";

import React, { useState, useEffect, Suspense } from "react";
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
import { Wand2, Loader2, Upload, X } from "lucide-react";
import dynamic from "next/dynamic";
import { generateWithGemini } from "@/actions/gemini";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { savePost } from "@/actions/savePost";
import { updatePost } from "@/actions/updatePost";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { IPost } from "@/lib/models/post.model";
import { JSONContent } from "novel";

const TailwindAdvancedEditor = dynamic(
	() => import("@/components/tailwind/advanced-editor"),
	{ ssr: false }
);

interface BlogPostFormProps {
	post?: IPost;
	mode: "create" | "update";
}

export default function BlogPostForm({ post, mode }: BlogPostFormProps) {
	const [title, setTitle] = useState(post?.title || "");
	const [slug, setSlug] = useState(post?.slug || "");
	const [description, setDescription] = useState(post?.description || "");
	const [content, setContent] = useState<JSONContent>(() => {
		if (post?.content) {
			try {
				return JSON.parse(post.content);
			} catch (error) {
				console.error("Failed to parse post content:", error);
				return {};
			}
		}
		return {};
	});
	const [headerImage, setHeaderImage] = useState(post?.headerImage || "");
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
			toast.error(
				`Please fill in all fields before ${
					mode === "create" ? "publishing" : "updating"
				}.`
			);
			return;
		}

		if (!user) {
			toast.error(
				`Please sign in to ${mode === "create" ? "publish" : "update"} a post.`
			);
			return;
		}

		const postData: Partial<IPost> = {
			title,
			slug,
			description,
			content: JSON.stringify(content),
			headerImage,
			author: user.username || "",
			updatedAt: new Date(),
		};

		if (mode === "create") {
			postData.createdAt = new Date();
		}

		try {
			const result =
				mode === "create"
					? await savePost(postData as IPost)
					: await updatePost(post!.slug, postData);

			if (result.success) {
				console.log(`Post ${mode}d:`, result.post);
				toast.success(`Post ${mode}d successfully!`);
				router.push(`/dashboard/blog${mode === "update" ? `/${slug}` : ""}`);
				router.refresh();
			} else {
				toast.error(`Failed to ${mode} post: ${result.error}`);
			}
		} catch (error: any) {
			console.error(`Error ${mode}ing post:`, error);
			toast.error(`Failed to ${mode} post: ${error.message}`);
		}
	};

	const generateWithAI = async (
		field: "title" | "description",
		customPrompt: string
	) => {
		const prompts = {
			title: `Generate a concise, engaging, and relevant blog post title. Use simple words, avoid clickbait, and ensure it accurately represents the content. NO MARKDOWN, JUST PURE TEXT. Prompt: ${customPrompt}`,
			description: `Generate a brief, engaging blog post description that summarizes the main points and entices readers to learn more. Keep it under 200 characters. NO MARKDOWN, JUST PURE TEXT. Prompt: ${customPrompt}`,
		};

		try {
			const generatedContent = await generateWithGemini(prompts[field]);
			if (field === "title") setTitle(generatedContent);
			else setDescription(generatedContent);
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
				<CardTitle className="text-3xl font-bold">
					{mode === "create" ? "Create New Blog Post" : "Update Blog Post"}
				</CardTitle>
				<Button type="submit" size="lg" className="px-8" onClick={handleSubmit}>
					{mode === "create" ? "Publish Post" : "Update Post"}
				</Button>
			</CardHeader>
			<CardContent>
				<form className="space-y-6">
					<FormField
						label="Title"
						id="title"
						value={title}
						onChange={setTitle}
						placeholder="Enter your captivating title"
						aiGenerate={(prompt) => generateWithAI("title", prompt)}
					/>
					<FormField
						label="Slug"
						id="slug"
						value={slug}
						onChange={setSlug}
						placeholder="your-post-slug"
						button={
							<Button onClick={generateSlug} type="button">
								Generate
							</Button>
						}
					/>
					<FormField
						label="Description"
						id="description"
						value={description}
						onChange={setDescription}
						placeholder="Write a brief, engaging description"
						aiGenerate={(prompt) => generateWithAI("description", prompt)}
						textarea
						hint="NOTE: this will be used for socials and google metadata"
					/>
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<Label htmlFor="headerImage" className="text-lg font-semibold">
								Header Image
							</Label>
							<UploadButton
								endpoint="imageUploader"
								onClientUploadComplete={(res) => {
									if (res && res.length > 0) {
										setHeaderImage(res[0].url);
										toast.success("Header image uploaded successfully");
									}
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
								<Button
									variant="destructive"
									size="icon"
									className="absolute top-2 right-2"
									onClick={() => setHeaderImage("")}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
						) : (
							<div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
								<Upload className="mx-auto h-12 w-12 text-gray-400" />
								<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
									No header image uploaded
								</p>
							</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="content">Content</Label>
						<Suspense
							fallback={
								<div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
									<div className="flex flex-col items-center gap-2">
										<Loader2 className="h-8 w-8 animate-spin text-primary" />
										<p className="text-sm text-muted-foreground">
											Loading editor...
										</p>
									</div>
								</div>
							}
						>
							<TailwindAdvancedEditor
								onChange={setContent}
								initialContent={content}
							/>
						</Suspense>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}

interface FormFieldProps {
	label: string;
	id: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	aiGenerate?: (prompt: string) => Promise<boolean>;
	button?: React.ReactNode;
	textarea?: boolean;
	hint?: string;
}

function FormField({
	label,
	id,
	value,
	onChange,
	placeholder,
	aiGenerate,
	button,
	textarea,
	hint,
}: FormFieldProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor={id}>{label}</Label>
			<div className="flex space-x-2">
				{textarea ? (
					<Textarea
						id={id}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder={placeholder}
						className="flex-grow"
					/>
				) : (
					<Input
						id={id}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder={placeholder}
						className="flex-grow"
					/>
				)}
				{aiGenerate && <AIGenerateButton onGenerate={aiGenerate} />}
				{button}
			</div>
			{hint && <p className="text-xs text-muted-foreground">{hint}</p>}
		</div>
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
