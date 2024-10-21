import React from "react";
import MobileSidebar from "@/components/shared/dashboard/mobile-dashboard";
import Sidebar from "@/components/shared/dashboard/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen w-full overflow-hidden">
			<Sidebar />
			<div className="flex flex-col flex-grow">
				<MobileSidebar />
				<main className="flex-grow overflow-auto px-6 py-8 container mx-auto">
					{children}
				</main>
			</div>
		</div>
	);
}
