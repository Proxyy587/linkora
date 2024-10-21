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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function SocialLinks() {
	const [links, setLinks] = useState([
		{ id: 1, platform: "Twitter", url: "https://twitter.com/username" },
		{ id: 2, platform: "Instagram", url: "https://instagram.com/username" },
		{ id: 3, platform: "LinkedIn", url: "https://linkedin.com/in/username" },
	]);

	const handleAddLink = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<div className="space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold text-primary">Social Links</h1>
				<Button variant="outline">
					<Plus className="mr-2 h-4 w-4" />
					Add New Link
				</Button>
			</div>

			<Card className="bg-background">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">Your Links</CardTitle>
					<CardDescription className="text-muted-foreground">
						Manage your social media profiles and important links.
					</CardDescription>
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

			<Card className="bg-accent">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">Add New Link</CardTitle>
					<CardDescription className="text-muted-foreground">
						Add a new social media profile or important link.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleAddLink} className="space-y-6">
						<div className="grid grid-cols-2 gap-6">
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
