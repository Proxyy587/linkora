import React from "react";
import { notFound } from "next/navigation";
import { getUserByEmail } from "@/actions/getUserByEmail";
import { IUserData } from "@/lib/models/user.model";
import { Navbar } from "../_components/minimalistic/nav";
import Footer from "../_components/minimalistic/footer";

export const metadata = {
	title: "Blog",
	description: "Read my blog.",
};

const DomainSlug = async ({
	params,
}: {
	params: { domain: string; slug: string };
}) => {
	const { domain, slug } = params;

	const domainParts = domain.split(".");
	const owner = (await getUserByEmail(domainParts[0])) as IUserData;

	if (domainParts.length < 2 && !owner) {
		return notFound();
	}

	return (
		<div>
			DomainSlug for {owner.username}. <code>/{slug}</code> doesnt exist
		</div>
	);
};

export default DomainSlug;
