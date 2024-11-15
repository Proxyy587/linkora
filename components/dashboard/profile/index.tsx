"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { getUserAndSaveEmail } from "@/actions/getUserDetails";
import { saveUserInfo } from "@/actions/saveUserInfo";
import { toast } from "sonner";
import TemplateSelection from "./TemplateSelection";
import SocialLinks from "./SocialLinks";
import ProfileForm from "./ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IUserData } from "@/lib/models/user.model";
import { getUserByEmail } from "@/actions/getUserByEmail";

export default function ProfileAndSocials() {
	const { user, isLoaded } = useUser();
	const [userInfo, setUserInfo] = useState<IUserData | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		const fetchUserData = async () => {
			if (user?.username) {
				try {
					const userData = await getUserByEmail(user.username);
					if (userData) {
						setUserInfo({
							name: userData.name || user?.fullName || "",
							username: userData.username || user?.username || "",
							contact: {
								email:
									userData.contact?.email ||
									user?.primaryEmailAddress?.emailAddress ||
									"",
								phone: userData.contact?.phone || "",
							},
							title: userData.title || "",
							description: userData.description || "",
							status: userData.status || "",
							bio: userData.bio || "",
							templateTheme: userData.templateTheme || "minimalistic",
							socialLinks: userData.socialLinks || {},
							image: userData.image || user?.imageUrl || "",
							education: [],
							experience: [],
							personality: [],
							position: "",
							profile_links: [],
							projects: [],
							technological_skills: null,
						});
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
					toast.error("Failed to load user data. Please try again.");
					setUserInfo({
						name: user.fullName || "",
						username: user.username || "",
						contact: {
							email: user.primaryEmailAddress?.emailAddress || "",
							phone: "",
						},
						templateTheme: "minimalistic",
						image: user.imageUrl || "",
						technological_skills: null,
					});
				}
			}
		};
		if (isLoaded) {
			fetchUserData();
		}
	}, [user, isLoaded]);

	const handleSave = async () => {
		if (user && userInfo) {
			setIsSaving(true);
			try {
				await saveUserInfo(user?.username || "", userInfo);

				if (user.username !== userInfo.username) {
					await user.update({ username: userInfo.username });
				}

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
				const imageUrl = await user.imageUrl;
				setUserInfo((prevInfo) =>
					prevInfo ? { ...prevInfo, image: imageUrl } : null
				);
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
				<div className="space-y-4">Loading...</div>
			</div>
		);

	return (
		<div className="max-w-7xl mx-auto p-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-primary">
					Your Professional Profile
				</h1>
				<Button
					onClick={handleSave}
					disabled={isSaving}
					className="bg-primary hover:bg-primary/90 transition-all duration-300 px-6 py-2"
				>
					{isSaving ? "Saving..." : "Save Changes"}
				</Button>
			</div>

			<Card className="grid grid-cols-1 md:grid-cols-4 gap-8 p-6">
				<div className="md:col-span-1">
					<div className="flex flex-col items-center space-y-4">
						<label
							htmlFor="profile-image-upload"
							className="cursor-pointer hover:opacity-90"
						>
							<Image
								src={userInfo.image || "/default-avatar.png"}
								alt="Profile"
								width={120}
								height={120}
								className="rounded-full border-4 border-primary hover:opacity-90 transition-opacity duration-300"
							/>
						</label>

						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
							id="profile-image-upload"
						/>

						<div className="text-center">
							<h2 className="text-xl font-semibold">{userInfo.name}</h2>
							<p className="text-sm text-muted-foreground mt-1">
								{userInfo.contact?.email}
							</p>
							<p className="text-sm text-muted-foreground">
								@{userInfo.username}
							</p>
						</div>
					</div>
				</div>

				<div className="md:col-span-3">
					<Tabs defaultValue="profile" className="w-full">
						<TabsList className="grid w-full grid-cols-3 mb-8">
							<TabsTrigger value="profile" className="text-sm py-2">
								Profile
							</TabsTrigger>
							<TabsTrigger value="template" className="text-sm py-2">
								Site Template
							</TabsTrigger>
							<TabsTrigger value="social" className="text-sm py-2">
								Social Links
							</TabsTrigger>
						</TabsList>
						<div className="mt-6">
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
									socialLinks={userInfo.socialLinks || {}}
									onSocialLinksChange={(updatedLinks) => {
										setUserInfo({
											...userInfo,
											socialLinks: updatedLinks,
										});
									}}
								/>
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</Card>
		</div>
	);
}
