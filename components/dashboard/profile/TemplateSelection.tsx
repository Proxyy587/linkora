import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const SITE_TEMPLATES = [
	{ name: "minimalist", imagePath: "/development/3.jpg" },
	{ name: "modern", imagePath: "/development/1.jpg", comingSoon: true },
	{ name: "classic", imagePath: "/development/2.jpg", comingSoon: true },
];

interface TemplateSelectionProps {
	selectedTheme: string;
	onThemeChange: (theme: string) => void;
}

export default function TemplateSelection({
	selectedTheme,
	onThemeChange,
}: TemplateSelectionProps) {
	return (
		<Card className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
			<CardHeader>
				<CardTitle className="text-2xl text-primary">Site Template</CardTitle>
				<CardDescription className="text-muted-foreground">
					Choose a template for your portfolio site.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{SITE_TEMPLATES.map((template) => (
						<div
							key={template.name}
							className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
								template.comingSoon ? "opacity-60 cursor-not-allowed" :
								selectedTheme === template.name
									? "border-primary shadow-lg scale-105 cursor-pointer"
									: "border-transparent hover:border-primary/50 cursor-pointer"
							}`}
							onClick={() => !template.comingSoon && onThemeChange(template.name)}
						>
							{template.comingSoon && (
								<div className="absolute inset-0 flex items-center justify-center bg-black/30">
									<span className="bg-black/70 text-white px-3 py-1 rounded">Coming Soon</span>
								</div>
							)}
							<Image
								src={template.imagePath}
								alt={`${template.name} template`}
								width={300}
								height={200}
								className="w-full h-auto object-cover"
							/>
							<p className="text-center py-2 capitalize font-medium">
								{template.name}
							</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
