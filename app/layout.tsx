import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@/components/widget/prosemirror.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Linkora",
	description: "Linkora",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={jakarta.className}>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
						{children}
						<Toaster position="top-center" richColors />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
