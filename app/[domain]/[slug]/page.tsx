import React from "react";
import { notFound } from "next/navigation";
import { getUserByEmail } from "@/actions/getUserByEmail";
import { Owner } from "../page";

const DomainSlug = async ({
	params,
}: {
	params: { domain: string; slug: string };
}) => {
	const { domain, slug } = params;

	const domainParts = domain.split(".");
	const owner = (await getUserByEmail(domainParts[0])) as Owner;

	if (domainParts.length < 2 && !owner) {
		return notFound();
	}

	return <div>DomainSlug for {owner.username}</div>;
};

export default DomainSlug;
