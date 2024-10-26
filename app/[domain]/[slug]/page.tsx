import React from "react";
import { notFound } from "next/navigation";
import { getUserByEmail } from "@/actions/getUserByEmail";
import { IUserData } from "@/lib/models/user.model";
import { BlogPosts } from "@/app/[domain]/_components/blogs/BlogPost";
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

	if (slug === "blog") {
		return (
			<div className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
				<main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
					<Navbar />
					<section className="flex flex-col gap-4">
						<h1 className="font-semibold text-2xl mb-8 tracking-tighter">
							{owner.username}'s Blog
						</h1>
						<BlogPosts username={owner.username} />
					</section>
					<Footer />
				</main>
			</div>
		);
	}

	return (
		<div>
			DomainSlug for {owner.username}. /{slug} doesnt exist
		</div>
	);
};

export default DomainSlug;
