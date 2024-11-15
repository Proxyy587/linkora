import React from "react";
import { IUserData } from "@/lib/models/user.model";
import Navbar from "@/app/[domain]/_components/modern/nav";
import Footer from "@/app/[domain]/_components/modern/footer";
import { platformIcons } from "@/constants";
import Contact from "@/app/[domain]/_components/minimalistic/contact";

interface ModernTemplateProps {
	user: IUserData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ user }) => {
	const socials =
		user.socialLinks instanceof Map
			? Object.fromEntries(user.socialLinks)
			: user.socialLinks;

	return (
		<div className="max-w-3xl mx-auto px-4 py-10 bg-gray-900 text-white rounded-lg">
			<Navbar />
			<main className="space-y-10">
				<header className="border-b border-gray-700 pb-6">
					<h1 className="text-5xl font-extrabold text-primary">{user.name}</h1>
					<p className="text-xl text-gray-400">{user.title}</p>
				</header>
				<section className="space-y-6">
					<p className="text-gray-300">{user.bio}</p>
					<p className="text-gray-300">{user.description}</p>
				</section>
				{socials && Object.keys(socials).length > 0 && (
					<section>
						<h2 className="text-3xl font-semibold text-primary mb-3">
							Connect
						</h2>
						<ul className="flex space-x-6">
							{Object.entries(socials).map(([platform, url]) => (
								<li key={platform}>
									<a
										href={url as string}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-400 hover:text-primary transition-colors"
									>
										{platformIcons[platform.toLowerCase()] ||
											platformIcons["default"]}
									</a>
								</li>
							))}
						</ul>
					</section>
				)}
				<section>
					<h2 className="text-3xl font-semibold text-primary mb-3">Contact</h2>
					{user.contact && <Contact email={user.contact.email} />}
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default ModernTemplate;
