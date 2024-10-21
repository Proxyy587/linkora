import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<div className="fixed top-4 left-4 m-4">
				<Link href="/">
					<Button
						variant="outline"
						className="flex items-center justify-center gap-2"
					>
						<ArrowLeft className="size-4" />
						Go Back
					</Button>
				</Link>
			</div>
			{children}
		</div>
	);
}
