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
	{ name: "modern", imagePath: "/development/1.jpg" },
	{ name: "classic", imagePath: "/development/2.jpg" },
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
							className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
								selectedTheme === template.name
									? "border-primary shadow-lg scale-105"
									: "border-transparent hover:border-primary/50"
							}`}
							onClick={() => onThemeChange(template.name)}
						>
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
