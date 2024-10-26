import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserInfo } from "./index";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ProfileFormProps {
	userInfo: UserInfo;
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

export default function ProfileForm({
	userInfo,
	setUserInfo,
}: ProfileFormProps) {
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setUserInfo((prev: UserInfo | null) =>
			prev ? { ...prev, [name]: value } : null
		);
	};

	return (
		<Card className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
			<CardHeader>
				<CardTitle className="text-2xl text-primary">
					Profile Information
				</CardTitle>
				<CardDescription className="text-muted-foreground">
					Customize your portfolio profile and introduction.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<Label htmlFor="name" className="text-primary">
								Name
							</Label>
							<Input
								id="name"
								name="name"
								value={userInfo.name}
								onChange={handleChange}
								className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="username" className="text-primary">
								Username
							</Label>
							<Input
								id="username"
								name="username"
								value={userInfo.username}
								onChange={handleChange}
								className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
							/>
							<p className="text-xs text-muted-foreground">
								This will be used in your profile URL.
							</p>
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="status" className="text-primary">
							Current Status
						</Label>
						<Input
							id="status"
							name="status"
							placeholder="e.g. Available for freelance work"
							value={userInfo.status || ""}
							onChange={handleChange}
							className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
						/>
						<p className="text-xs text-muted-foreground">
							This will appear below your name on your profile.
						</p>
					</div>
					<div className="space-y-2">
						<Label htmlFor="title" className="text-primary">
							Professional Title
						</Label>
						<Input
							id="title"
							name="title"
							placeholder="e.g. Full Stack Developer"
							value={userInfo.title || ""}
							onChange={handleChange}
							className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="description" className="text-primary">
							Short Description
						</Label>
						<Textarea
							id="description"
							name="description"
							placeholder="A brief introduction about yourself"
							value={userInfo.description || ""}
							onChange={handleChange}
							className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
							rows={2}
						/>
						<p className="text-xs text-muted-foreground">
							This will appear at the top of your profile. Keep it concise.
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="bio" className="text-primary">
							Detailed Bio
						</Label>
						<Textarea
							id="bio"
							name="bio"
							placeholder="Share your professional journey, skills, and interests"
							value={userInfo.bio || ""}
							onChange={handleChange}
							className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
							rows={7}
						/>
						<div className="flex items-center space-x-2">
							<p className="text-xs text-muted-foreground">
								You can use{" "}
								<Dialog>
									<DialogTrigger asChild>Markdown Guide</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Markdown Guide</DialogTitle>
											<DialogDescription>
												Here are some basic Markdown formatting options:
											</DialogDescription>
										</DialogHeader>
										<div className="space-y-2">
											<p>
												<strong># Header 1</strong> - Large Header
											</p>
											<p>
												<strong>## Header 2</strong> - Medium Header
											</p>
											<p>
												<strong>**Bold Text**</strong> -{" "}
												<strong>Bold Text</strong>
											</p>
											<p>
												<strong>*Italic Text*</strong> - <em>Italic Text</em>
											</p>
											<p>
												<strong>[Link](https://example.com)</strong> -{" "}
												<a href="https://example.com">Link</a>
											</p>
											<p>
												<strong>- List Item</strong> - Bulleted List
											</p>
											<p>
												<strong>1. Numbered Item</strong> - Numbered List
											</p>
										</div>
									</DialogContent>
								</Dialog>{" "}
								to format your bio.
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
