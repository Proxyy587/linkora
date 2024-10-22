// "use client";

// import React, { useState, useEffect } from "react";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "@/components/ui/table";
// import { Pencil, Trash2, Plus, Upload, Music } from "lucide-react";
// import { useUser } from "@clerk/nextjs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Image from "next/image";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { saveUserInfo } from "@/actions/saveUserInfo";
// import { getUserByEmail } from "@/actions/getUserDetails";
// import { IUser } from "@/lib/models/user.model";
// import { toast } from "sonner";
// import useDebounce from "@/hooks/useDebounce";

// const SITE_TEMPLATES = [
// 	{ name: "modern", imagePath: "/development/1.jpg" },
// 	{ name: "classic", imagePath: "/development/2.jpg" },
// 	{ name: "minimalist", imagePath: "/development/3.jpg" },
// ];

// interface Link {
// 	id: number;
// 	platform: string;
// 	url: string;
// }

// interface UserInfo {
// 	name: string;
// 	username: string;
// 	email: string;
// 	title?: string;
// 	description?: string;
// 	status?: string;
// 	bio?: string;
// 	templateTheme: string;
// 	socialLinks: Record<string, string>;
// 	createdAt?: Date;
// 	updatedAt?: Date;
// }

// export default function EnhancedProfileAndSocials() {
// 	const { user } = useUser();
// 	const [links, setLinks] = useState<Link[]>([]);
// 	const [portfolioInfo, setPortfolioInfo] = useState<UserInfo | undefined>();
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [isSaving, setIsSaving] = useState(false);

// 	const debouncedPortfolioInfo = useDebounce(portfolioInfo, 500);

// 	useEffect(() => {
// 		const fetchUserData = async () => {
// 			if (user?.primaryEmailAddress?.emailAddress) {
// 				try {
// 					const userData = await getUserByEmail(
// 						user.primaryEmailAddress.emailAddress
// 					);
// 					if (userData) {
// 						const userInfo: UserInfo = {
// 							name: userData.name || user.fullName || "",
// 							username: userData.username || user.username || "",
// 							email: user.primaryEmailAddress.emailAddress || "",
// 							title: userData.title || "",
// 							description: userData.description || "",
// 							status: userData.status || "",
// 							bio: userData.bio || "",
// 							templateTheme: userData.templateTheme || "modern",
// 							socialLinks: userData.socialLinks || {},
// 							createdAt: userData.createdAt,
// 							updatedAt: userData.updatedAt,
// 						};
// 						setPortfolioInfo(userInfo);
// 						setLinks(
// 							Object.entries(userData.socialLinks || {}).map(
// 								([platform, url], index) => ({
// 									id: index,
// 									platform,
// 									url,
// 								})
// 							)
// 						);
// 					}
// 				} catch (error) {
// 					console.error("Error fetching user data:", error);
// 					toast.error("Failed to load user data. Please try again.");
// 				} finally {
// 					setIsLoading(false);
// 				}
// 			}
// 		};
// 		fetchUserData();
// 	}, [user]);

// 	useEffect(() => {
// 		const saveChanges = async () => {
// 			if (user && debouncedPortfolioInfo) {
// 				setIsSaving(true);
// 				try {
// 					const userInfoToSave: Partial<IUser> = {
// 						name: debouncedPortfolioInfo.name,
// 						username: debouncedPortfolioInfo.username,
// 						email: user.primaryEmailAddress?.emailAddress || "",
// 						title: debouncedPortfolioInfo.title,
// 						description: debouncedPortfolioInfo.description,
// 						status: debouncedPortfolioInfo.status,
// 						bio: debouncedPortfolioInfo.bio,
// 						templateTheme: debouncedPortfolioInfo.templateTheme,
// 						socialLinks: links.reduce((acc, link) => {
// 							acc[link.platform] = link.url;
// 							return acc;
// 						}, {} as Record<string, string>),
// 					};

// 					await saveUserInfo(user.id, userInfoToSave);
// 					toast.success("Your changes have been saved.");
// 				} catch (error) {
// 					console.error("Error saving user info:", error);
// 					toast.error("Failed to save changes. Please try again.");
// 				} finally {
// 					setIsSaving(false);
// 				}
// 			}
// 		};

// 		saveChanges();
// 	}, [debouncedPortfolioInfo, user, links]);

// 	const handleAddLink = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		const form = event.target as HTMLFormElement;
// 		const platform = (form.elements.namedItem("platform") as HTMLInputElement)
// 			.value;
// 		const url = (form.elements.namedItem("url") as HTMLInputElement).value;
// 		const newLink = { id: Date.now(), platform, url };
// 		setLinks([...links, newLink]);
// 		form.reset();
// 	};

// 	const handleRemoveLink = (id: number) => {
// 		setLinks(links.filter((link) => link.id !== id));
// 	};

// 	const handlePortfolioInfoChange = (
// 		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	) => {
// 		const { name, value } = event.target;
// 		setPortfolioInfo((prev) => {
// 			if (prev) {
// 				return { ...prev, [name]: value };
// 			}
// 			return prev;
// 		});
// 	};

// 	const handleSiteTemplateChange = (template: string) => {
// 		setPortfolioInfo((prev) => {
// 			if (prev) {
// 				return { ...prev, templateTheme: template };
// 			}
// 			return prev;
// 		});
// 	};

// 	const handleConnectSpotify = () => {
// 		// Implement Spotify connection
// 		console.log("Connecting to Spotify");
// 		toast.info("This feature is coming soon!");
// 	};

// 	const handleImageUpload = async (
// 		event: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		const file = event.target.files?.[0];
// 		if (file && user) {
// 			try {
// 				const result = await user.setProfileImage({ file });

// 				if (result) {
// 					toast.success("Profile image updated successfully.");
// 					window.location.reload();
// 				} else {
// 					throw new Error("Image upload failed");
// 				}
// 			} catch (error) {
// 				console.error("Error uploading image:", error);
// 				toast.error("Failed to update profile image. Please try again.");
// 			}
// 		}
// 	};

// 	if (isLoading) {
// 		return <div>Loading...</div>;
// 	}

// 	return (
// 		<div className="space-y-8 max-w-4xl mx-auto p-6">
// 			<h1 className="text-4xl font-bold text-primary text-center mb-12">
// 				Your Professional Profile
// 			</h1>

// 			<Tabs defaultValue="profile" className="w-full">
// 				<TabsList className="grid w-full grid-cols-3 mb-8">
// 					<TabsTrigger value="profile">Profile</TabsTrigger>
// 					<TabsTrigger value="template">Site Template</TabsTrigger>
// 					<TabsTrigger value="social">Social Links</TabsTrigger>
// 				</TabsList>
// 				<TabsContent value="profile">
// 					<Card className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
// 						<CardHeader>
// 							<CardTitle className="text-2xl text-primary">
// 								Profile Information
// 							</CardTitle>
// 							<CardDescription className="text-muted-foreground">
// 								Customize your portfolio profile and introduction.
// 							</CardDescription>
// 						</CardHeader>
// 						<CardContent>
// 							<div className="flex flex-col md:flex-row gap-8">
// 								<div className="flex flex-col items-center space-y-4">
// 									<Avatar className="w-32 h-32 border-4 border-primary">
// 										<AvatarImage
// 											src={user?.imageUrl}
// 											alt={user?.fullName || "Avatar"}
// 										/>
// 										<AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
// 									</Avatar>
// 									<Button variant="outline" size="sm" className="group">
// 										<Upload className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
// 										<label htmlFor="avatar-upload" className="cursor-pointer">
// 											Change Avatar
// 										</label>
// 										<input
// 											id="avatar-upload"
// 											type="file"
// 											accept="image/*"
// 											className="hidden"
// 											onChange={handleImageUpload}
// 										/>
// 									</Button>
// 								</div>
// 								<div className="flex-1 space-y-6">
// 									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// 										<div className="space-y-2">
// 											<Label htmlFor="name" className="text-primary">
// 												Name
// 											</Label>
// 											<Input
// 												id="name"
// 												name="name"
// 												value={portfolioInfo?.name || ""}
// 												onChange={handlePortfolioInfoChange}
// 												className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
// 											/>
// 										</div>
// 										<div className="space-y-2">
// 											<Label htmlFor="username" className="text-primary">
// 												Username
// 											</Label>
// 											<Input
// 												id="username"
// 												name="username"
// 												value={portfolioInfo?.username || ""}
// 												onChange={handlePortfolioInfoChange}
// 												className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
// 											/>
// 										</div>
// 									</div>
// 									<div className="space-y-2">
// 										<Label htmlFor="title" className="text-primary">
// 											Professional Title
// 										</Label>
// 										<Input
// 											id="title"
// 											name="title"
// 											placeholder="e.g. Full Stack Developer"
// 											value={portfolioInfo?.title || ""}
// 											onChange={handlePortfolioInfoChange}
// 											className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
// 										/>
// 									</div>
// 									<div className="space-y-2">
// 										<Label htmlFor="description" className="text-primary">
// 											Short Description
// 										</Label>
// 										<Textarea
// 											id="description"
// 											name="description"
// 											placeholder="A brief introduction about yourself"
// 											value={portfolioInfo?.description || ""}
// 											onChange={handlePortfolioInfoChange}
// 											className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
// 											rows={3}
// 										/>
// 									</div>
// 									<div className="space-y-2">
// 										<Label htmlFor="status" className="text-primary">
// 											Current Status
// 										</Label>
// 										<Input
// 											id="status"
// 											name="status"
// 											placeholder="e.g. Available for freelance work"
// 											value={portfolioInfo?.status || ""}
// 											onChange={handlePortfolioInfoChange}
// 											className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
// 										/>
// 									</div>
// 									<div className="space-y-2">
// 										<Label htmlFor="bio" className="text-primary">
// 											Detailed Bio
// 										</Label>
// 										<Textarea
// 											id="bio"
// 											name="bio"
// 											placeholder="Share your professional journey, skills, and interests"
// 											value={portfolioInfo?.bio || ""}
// 											onChange={handlePortfolioInfoChange}
// 											className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
// 											rows={5}
// 										/>
// 									</div>
// 								</div>
// 							</div>
// 						</CardContent>
// 					</Card>
// 				</TabsContent>
// 				<TabsContent value="template">
// 					<Card className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
// 						<CardHeader>
// 							<CardTitle className="text-2xl text-primary">
// 								Site Template
// 							</CardTitle>
// 							<CardDescription className="text-muted-foreground">
// 								Choose a template for your portfolio site.
// 							</CardDescription>
// 						</CardHeader>
// 						<CardContent>
// 							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// 								{SITE_TEMPLATES.map((template) => (
// 									<div
// 										key={template.name}
// 										className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
// 											portfolioInfo?.templateTheme === template.name
// 												? "border-primary shadow-lg scale-105"
// 												: "border-transparent hover:border-primary/50"
// 										}`}
// 										onClick={() => handleSiteTemplateChange(template.name)}
// 									>
// 										<Image
// 											src={template.imagePath}
// 											alt={`${template.name} template`}
// 											width={300}
// 											height={200}
// 											className="w-full h-auto object-cover"
// 										/>
// 										<p className="text-center py-2 capitalize font-medium">
// 											{template.name}
// 										</p>
// 									</div>
// 								))}
// 							</div>
// 						</CardContent>
// 					</Card>
// 				</TabsContent>
// 				<TabsContent value="social">
// 					<Card className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
// 						<CardHeader className="flex flex-row items-center justify-between">
// 							<div>
// 								<CardTitle className="text-2xl text-primary">
// 									Social Links
// 								</CardTitle>
// 								<CardDescription className="text-muted-foreground">
// 									Manage your social media profiles and important links.
// 								</CardDescription>
// 							</div>
// 						</CardHeader>
// 						<CardContent>
// 							<Table>
// 								<TableHeader>
// 									<TableRow>
// 										<TableHead className="text-primary">Platform</TableHead>
// 										<TableHead className="text-primary">URL</TableHead>
// 										<TableHead className="text-right text-primary">
// 											Actions
// 										</TableHead>
// 									</TableRow>
// 								</TableHeader>
// 								<TableBody>
// 									{links.map((link) => (
// 										<TableRow key={link.id}>
// 											<TableCell className="font-medium">
// 												{link.platform}
// 											</TableCell>
// 											<TableCell className="text-muted-foreground">
// 												{link.url}
// 											</TableCell>
// 											<TableCell className="text-right">
// 												<Button
// 													variant="ghost"
// 													size="sm"
// 													className="hover:text-destructive"
// 													onClick={() => handleRemoveLink(link.id)}
// 												>
// 													<Trash2 className="h-4 w-4" />
// 												</Button>
// 											</TableCell>
// 										</TableRow>
// 									))}
// 								</TableBody>
// 							</Table>
// 						</CardContent>
// 					</Card>

// 					<Card className="bg-accent shadow-lg mt-8 hover:shadow-xl transition-shadow duration-300">
// 						<CardHeader>
// 							<CardTitle className="text-2xl text-primary">
// 								Add New Social Link
// 							</CardTitle>
// 							<CardDescription className="text-muted-foreground">
// 								Expand your online presence by adding a new social media profile
// 								or important link.
// 							</CardDescription>
// 						</CardHeader>
// 						<CardContent>
// 							<form onSubmit={handleAddLink} className="space-y-6">
// 								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// 									<div className="space-y-2">
// 										<Label htmlFor="platform" className="text-primary">
// 											Platform
// 										</Label>
// 										<Input
// 											id="platform"
// 											name="platform"
// 											placeholder="e.g. Twitter, Instagram"
// 											className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
// 										/>
// 									</div>
// 									<div className="space-y-2">
// 										<Label htmlFor="url" className="text-primary">
// 											URL
// 										</Label>
// 										<Input
// 											id="url"
// 											name="url"
// 											placeholder="https://"
// 											className="bg-popover focus:ring-2 focus:ring-primary transition-all duration-300"
// 										/>
// 									</div>
// 								</div>
// 								<Button type="submit" className="w-full">
// 									Add Link
// 								</Button>
// 							</form>
// 						</CardContent>
// 					</Card>
// 				</TabsContent>
// 			</Tabs>

// 			<div className="flex justify-between items-center mt-12">
// 				<div>
// 					<Button
// 						onClick={handleConnectSpotify}
// 						className="bg-[#1DB954] hover:bg-[#1ed760] text-white transition-colors duration-300"
// 					>
// 						<Music className="mr-2 h-4 w-4" />
// 						Connect Spotify
// 					</Button>
// 				</div>
// 				<div>
// 					{isSaving ? (
// 						<Button disabled className="bg-primary/50">
// 							Saving...
// 						</Button>
// 					) : (
// 						<Button className="bg-primary hover:bg-primary/90 transition-colors duration-300">
// 							Changes Saved
// 						</Button>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
