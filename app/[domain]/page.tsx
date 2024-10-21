import { getUserByEmail } from "@/actions/getUserByEmail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface DomainPageProps {
	params: { domain: string };
}

interface OwnerList {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
}

const DomainPage = async ({ params }: DomainPageProps) => {
	const domain = params.domain.split(".")[0];
	const OwnerId = await getUserByEmail(domain) as OwnerList;
	console.log(OwnerId);

	if (!OwnerId) {
		return (
			<main className="flex items-center justify-center h-screen">
				<div className="text-center">
					<h1 className="text-4xl font-bold">404</h1>
					<p className="text-lg">
						The user you are looking for does not exist.
					</p>
					<Link href="/">
						<Button variant="link" className="mt-4 text-blue-500">
							Go back to the Homepage
						</Button>
					</Link>
				</div>
			</main>
		);
	}
	return <div>{OwnerId.username}</div>;
};

export default DomainPage;
