"use client";

import React from "react";
import LinkaoraBtn from "@/components/shared/linkaoraBtn";
import Script from "next/script";
import { useUser } from "@clerk/nextjs";

const DomainLayout = ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { domain: string };
}) => {
	return (
		<>
			{children}
			<LinkaoraBtn />
			<Script
				id="analytics-script"
				strategy="afterInteractive"
				src="/tracking-script.js"
				data-domain={`${params.domain}.${
					process.env.NODE_ENV === "production"
						? process.env.NEXT_PUBLIC_APP_HOSTNAME
						: "localhost:3000"
				}`}
				data-username={`${params.domain}`}
			/>
		</>
	);
};

export default DomainLayout;
