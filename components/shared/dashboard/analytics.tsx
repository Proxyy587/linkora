import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";

export default function Analytics() {
	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold text-primary">Analytics</h1>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card className="bg-background">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-primary">
							Total Views
						</CardTitle>
						<BarChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-primary">5,678</div>
						<p className="text-xs text-muted-foreground">
							+12% from last month
						</p>
					</CardContent>
				</Card>
				<Card className="bg-background">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-primary">
							Unique Visitors
						</CardTitle>
						<LineChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-primary">2,345</div>
						<p className="text-xs text-muted-foreground">+5% from last week</p>
					</CardContent>
				</Card>
				<Card className="bg-background">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-primary">
							Average Time on Page
						</CardTitle>
						<PieChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-primary">2m 15s</div>
						<p className="text-xs text-muted-foreground">
							-10s from last month
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card className="bg-background">
					<CardHeader>
						<CardTitle className="text-xl text-primary">
							Top Performing Links
						</CardTitle>
						<CardDescription className="text-muted-foreground">
							Click-through rates for your most popular links
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[200px] bg-accent rounded-md"></div>
					</CardContent>
				</Card>
				<Card className="bg-background">
					<CardHeader>
						<CardTitle className="text-xl text-primary">
							Traffic Sources
						</CardTitle>
						<CardDescription className="text-muted-foreground">
							Where your visitors are coming from
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[200px] bg-accent rounded-md"></div>
					</CardContent>
				</Card>
			</div>

			<Card className="bg-background">
				<CardHeader>
					<CardTitle className="text-xl text-primary">
						Visitor Demographics
					</CardTitle>
					<CardDescription className="text-muted-foreground">
						Age and location breakdown of your visitors
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-[300px] bg-accent rounded-md"></div>
				</CardContent>
			</Card>
		</div>
	);
}
