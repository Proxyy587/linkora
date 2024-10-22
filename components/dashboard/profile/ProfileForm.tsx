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
						</div>
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
							value={userInfo.status || ""}
							onChange={handleChange}
							className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
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
							value={userInfo.bio || ""}
							onChange={handleChange}
							className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
							rows={5}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
