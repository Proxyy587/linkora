"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { getUserByEmail } from "@/actions/getUserDetails";
import { saveUserInfo } from "@/actions/saveUserInfo";
import { toast } from "sonner";
import TemplateSelection from "./TemplateSelection";
import SocialLinks from "./SocialLinks";
import ProfileForm from "./ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export interface UserInfo {
	name: string;
	username: string;
	email: string;
	title?: string;
	description?: string;
	status?: string;
	bio?: string;
	templateTheme: string;
	socialLinks: Record<string, string>;
	profileImage?: string;
}

export default function EnhancedProfileAndSocials() {
	const { user } = useUser();
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		const fetchUserData = async () => {
			if (user?.primaryEmailAddress?.emailAddress) {
				try {
					const userData = await getUserByEmail(
						user.primaryEmailAddress.emailAddress
					);
					if (userData) {
						setUserInfo({
							name: userData.name || user.fullName || "",
							username: userData.username || user.username || "",
							email: userData.email || user.primaryEmailAddress.emailAddress,
							title: userData.title || "",
							description: userData.description || "",
							status: userData.status || "",
							bio: userData.bio || "",
							templateTheme: userData.templateTheme || "modern",
							socialLinks: userData.socialLinks || {},
							profileImage: userData.image || user.imageUrl || "",
						});
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
					toast.error("Failed to load user data. Please try again.");
				}
			}
		};
		fetchUserData();
	}, [user]);

	const handleSave = async () => {
		if (user && userInfo) {
			setIsSaving(true);
			try {
				await saveUserInfo(user.primaryEmailAddress?.emailAddress || '', userInfo);
				toast.success("Changes saved successfully");
			} catch (error) {
				console.error("Error saving user info:", error);
				toast.error("Failed to save changes. Please try again.");
			} finally {
				setIsSaving(false);
			}
		}
	};

	const handleImageChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file && user) {
			try {
				await user.setProfileImage({ file });
				toast.success("Profile picture updated successfully");
			} catch (error) {
				console.error("Error updating profile image:", error);
				toast.error("Failed to update profile picture. Please try again.");
			}
		}
	};

	if (!userInfo)
		return (
			<div className="flex justify-center items-center h-screen">
				Loading...
			</div>
		);

	return (
		<div className="max-w-5xl mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-primary">
					Your Professional Profile
				</h1>
				<Button
					onClick={handleSave}
					disabled={isSaving}
					className="bg-primary hover:bg-primary/90 transition-all duration-300"
				>
					{isSaving ? "Saving..." : "Save Changes"}
				</Button>
			</div>

			<Card className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<div className="md:col-span-1 shadow-md">
					<div className="p-4 flex flex-col items-center">
						{userInfo.profileImage && (
							<label
								htmlFor="profile-image-upload"
								className={`cursor-pointer hover:opacity-90 before:content-[''] before:mr-2`}
							>
								<Image
									src={userInfo.profileImage || ""}
									alt="Profile"
									width={100}
									height={100}
									className="rounded-full mb-4 border-4 border-primary hover:opacity-90"
								/>
							</label>
						)}

						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
							id="profile-image-upload"
						/>

						<div className="text-center mb-4">
							<p className="text-sm text-gray-600">@{userInfo.username}</p>
							<h2 className="text-lg font-semibold">{userInfo.name}</h2>
							<p className="text-sm text-gray-600">{userInfo.email}</p>
						</div>
					</div>
				</div>

				<div className="md:col-span-3 shadow-md">
					<div className="p-4">
						<Tabs defaultValue="profile" className="w-full">
							<TabsList className="grid w-full grid-cols-3 mb-6">
								<TabsTrigger value="profile" className="text-sm">
									Profile
								</TabsTrigger>
								<TabsTrigger value="template" className="text-sm">
									Site Template
								</TabsTrigger>
								<TabsTrigger value="social" className="text-sm">
									Social Links
								</TabsTrigger>
							</TabsList>
							<div className="mt-4">
								<TabsContent value="profile">
									<ProfileForm userInfo={userInfo} setUserInfo={setUserInfo} />
								</TabsContent>
								<TabsContent value="template">
									<TemplateSelection
										selectedTheme={userInfo.templateTheme}
										onThemeChange={(theme) =>
											setUserInfo({ ...userInfo, templateTheme: theme })
										}
									/>
								</TabsContent>
								<TabsContent value="social">
									<SocialLinks
										socialLinks={userInfo.socialLinks}
										onSocialLinksChange={(links) =>
											setUserInfo({ ...userInfo, socialLinks: links })
										}
									/>
								</TabsContent>
							</div>
						</Tabs>
					</div>
				</div>
			</Card>
		</div>
	);
}
