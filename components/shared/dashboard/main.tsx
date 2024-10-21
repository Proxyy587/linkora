"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	BarChart,
	Users,
	Eye,
	ArrowRight,
	Link,
	FileText,
	Settings,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

export default function DashboardMain() {
	const { user } = useUser();

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-semibold">
				Welcome back, {user?.firstName}!
			</h1>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Views</CardTitle>
						<Eye className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">0</div>
						<p className="text-xs text-muted-foreground">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Link Clicks</CardTitle>
						<BarChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">0</div>
						<p className="text-xs text-muted-foreground">+15% from last week</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">New Followers</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">0</div>
						<p className="text-xs text-muted-foreground">
							+8 in the last 24 hours
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl font-semibold">
							Quick Actions
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<Button variant="secondary" className="w-full justify-start">
							<Link className="mr-2 h-4 w-4" />
							Add New Social Link
						</Button>
						<Button variant="secondary" className="w-full justify-start">
							<FileText className="mr-2 h-4 w-4" />
							Create Blog Post
						</Button>
						<Button variant="secondary" className="w-full justify-start">
							<Settings className="mr-2 h-4 w-4" />
							Customize Theme
						</Button>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="text-xl font-semibold">
							Your Public Page
						</CardTitle>
						<CardDescription>username.domain.name</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="aspect-video rounded-md bg-muted"></div>
						<Button variant="outline" className="w-full">
							Preview Page
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
