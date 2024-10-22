"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileAndSocials() {
	const { user } = useUser();
	const [links, setLinks] = useState([
		{ id: 1, platform: "Twitter", url: "https://twitter.com/username" },
		{ id: 2, platform: "Instagram", url: "https://instagram.com/username" },
		{ id: 3, platform: "LinkedIn", url: "https://linkedin.com/in/username" },
	]);
	const [portfolioInfo, setPortfolioInfo] = useState({
		name: user?.fullName || "",
		title: "",
		description: "",
		status: "",
		bio: "",
	});

	const handleAddLink = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const handlePortfolioInfoChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setPortfolioInfo((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold text-primary">Profile</h1>

			<Card className="bg-background shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">
						Profile Information
					</CardTitle>
					<CardDescription className="text-muted-foreground">
						Customize your portfolio profile and introduction.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col md:flex-row gap-8">
						<div className="flex flex-col items-center space-y-4">
							<Avatar className="w-32 h-32">
								<AvatarImage
									src={user?.imageUrl}
									alt={user?.fullName || "Avatar"}
								/>
								<AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
							</Avatar>
							<Button variant="outline" size="sm">
								<Upload className="mr-2 h-4 w-4" />
								Change Avatar
							</Button>
						</div>
						<div className="flex-1 space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="name" className="text-primary">
										Name
									</Label>
									<Input
										id="name"
										name="name"
										value={portfolioInfo.name}
										onChange={handlePortfolioInfoChange}
										className="bg-popover"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="title" className="text-primary">
										Professional Title
									</Label>
									<Input
										id="title"
										name="title"
										placeholder="e.g. Full Stack Developer"
										value={portfolioInfo.title}
										onChange={handlePortfolioInfoChange}
										className="bg-popover"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="description" className="text-primary">
									Short Description
								</Label>
								<Textarea
									id="description"
									name="description"
									placeholder="A brief introduction about yourself"
									value={portfolioInfo.description}
									onChange={handlePortfolioInfoChange}
									className="bg-popover"
									rows={3}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="status" className="text-primary">
									Current Status
								</Label>
								<Input
									id="status"
									name="status"
									placeholder="e.g. Available for freelance work"
									value={portfolioInfo.status}
									onChange={handlePortfolioInfoChange}
									className="bg-popover"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="bio" className="text-primary">
									Detailed Bio
								</Label>
								<Textarea
									id="bio"
									name="bio"
									placeholder="Share your professional journey, skills, and interests"
									value={portfolioInfo.bio}
									onChange={handlePortfolioInfoChange}
									className="bg-popover"
									rows={5}
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="bg-background shadow-lg">
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle className="text-2xl text-primary">
							Social Links
						</CardTitle>
						<CardDescription className="text-muted-foreground">
							Manage your social media profiles and important links.
						</CardDescription>
					</div>
					<Button variant="outline">
						<Plus className="mr-2 h-4 w-4" />
						Add New Link
					</Button>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-primary">Platform</TableHead>
								<TableHead className="text-primary">URL</TableHead>
								<TableHead className="text-right text-primary">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{links.map((link) => (
								<TableRow key={link.id}>
									<TableCell className="font-medium">{link.platform}</TableCell>
									<TableCell className="text-muted-foreground">
										{link.url}
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

			<Card className="bg-accent shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">
						Add New Social Link
					</CardTitle>
					<CardDescription className="text-muted-foreground">
						Expand your online presence by adding a new social media profile or
						important link.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleAddLink} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="platform" className="text-primary">
									Platform
								</Label>
								<Input
									id="platform"
									placeholder="e.g. Twitter, Instagram"
									className="bg-popover"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="url" className="text-primary">
									URL
								</Label>
								<Input id="url" placeholder="https://" className="bg-popover" />
							</div>
						</div>
						<Button type="submit" className="w-full">
							Add Link
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
