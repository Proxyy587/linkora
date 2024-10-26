import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { FileText, Link2 } from "lucide-react";

const Landing = () => {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="container mx-auto px-4 py-16 text-center">
				<header className="">
					<h1 className="h1-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
						LinkHub
					</h1>
					<p className="p-regular-12 wrapper text-muted-foreground max-w-lg">
						Your all-in-one platform for personal branding and content sharing{" "}
						<br />
						More than just links. It&apos;s your digital identity
					</p>
				</header>

				<main className="max-w-4xl mx-auto">
					<div className="flex justify-center gap-2">
						<Link href="/signup">
							<Button className="rounded-full">
								<Link2 className="w-4 h-4 mr-1" />
								Try Now
							</Button>
						</Link>
						<Link href="/learn-more">
							<Button variant="outline" className="rounded-full">
								<FileText className="w-4 h-4 mr-1" />
								Learn More
							</Button>
						</Link>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Landing;
