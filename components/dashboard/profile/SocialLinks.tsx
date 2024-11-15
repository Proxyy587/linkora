import React, { useState, useEffect } from "react";
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
import { Trash2 } from "lucide-react";

interface SocialLinksProps {
	socialLinks: Record<string, string>;
	onSocialLinksChange: (links: Record<string, string>) => void;
}

export default function SocialLinks({
	socialLinks,
	onSocialLinksChange,
}: SocialLinksProps) {
	const [newPlatform, setNewPlatform] = useState("");
	const [newUrl, setNewUrl] = useState("");
	const [links, setLinks] = useState<Record<string, string>>(socialLinks || {});

	useEffect(() => {
		setLinks(socialLinks || {});
	}, [socialLinks]);

	const handleAddLink = (e: React.FormEvent) => {
		e.preventDefault();
		if (newPlatform && newUrl) {
			const updatedLinks = { ...links, [newPlatform]: newUrl };
			setLinks(updatedLinks);
			onSocialLinksChange(updatedLinks);
			setNewPlatform("");
			setNewUrl("");
		}
	};

	const handleRemoveLink = (platform: string) => {
		const updatedLinks = { ...links };
		delete updatedLinks[platform];
		setLinks(updatedLinks);
		onSocialLinksChange(updatedLinks);
	};

	return (
		<Card className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
			<CardHeader>
				<CardTitle className="text-2xl text-primary">Social Links</CardTitle>
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
							<TableHead className="text-right text-primary">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.keys(links).length > 0 ? (
							Object.entries(links).map(([platform, url]) => (
								<TableRow key={platform}>
									<TableCell className="font-medium">{platform}</TableCell>
									<TableCell className="text-muted-foreground">{url}</TableCell>
									<TableCell className="text-right">
										<Button
											variant="ghost"
											size="sm"
											className="hover:text-destructive"
											onClick={() => handleRemoveLink(platform)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={3}
									className="text-center text-muted-foreground"
								>
									No social links added yet.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				<form onSubmit={handleAddLink} className="mt-6 space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="platform" className="text-primary">
								Platform
							</Label>
							<Input
								id="platform"
								value={newPlatform}
								onChange={(e) => setNewPlatform(e.target.value)}
								placeholder="e.g. Twitter, LinkedIn"
								className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="url" className="text-primary">
								URL
							</Label>
							<Input
								id="url"
								value={newUrl}
								onChange={(e) => setNewUrl(e.target.value)}
								placeholder="https://"
								className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
							/>
						</div>
					</div>
					<Button type="submit" className="w-full">
						Add Link
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
