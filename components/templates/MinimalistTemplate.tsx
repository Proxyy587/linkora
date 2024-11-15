import React from "react";
import { IUserData } from "@/lib/models/user.model";
import {
	FaBehance,
	FaDiscord,
	FaDribbble,
	FaFacebook,
	FaLink,
	FaMedium,
	FaPinterest,
	FaReddit,
	FaSnapchat,
	FaTelegram,
	FaTiktok,
	FaTwitch,
	FaWhatsapp,
	FaYoutube,
} from "react-icons/fa";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Navbar } from "@/app/[domain]/_components/minimalistic/nav";
import Footer from "@/app/[domain]/_components/minimalistic/footer";
import Contact from "@/app/[domain]/_components/minimalistic/contact";
import { platformIcons } from "@/constants";
import { BlogPosts } from "@/app/[domain]/_components/blogs/BlogPost";

interface MinimalistTemplateProps {
	user: IUserData;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ user }) => {
	const socials =
		user.socialLinks instanceof Map
			? Object.fromEntries(user.socialLinks)
			: user.socialLinks;

	console.log(`socials: ${JSON.stringify(socials)}`);

	return (
		<div className="max-w-2xl mx-auto px-4 py-8">
			<Navbar />
			<main className="space-y-8">
				<header>
					<h1 className="text-3xl font-bold">{user.name}</h1>
					<div className="flex items-center mt-2">
						<p className="text-lg text-gray-600 dark:text-gray-400 mr-3">
							{user.title}
						</p>
						{user.status && (
							<span className="px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
								{user.status}
							</span>
						)}
					</div>
				</header>
				<section>
					<p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
					<p className="text-gray-700 dark:text-gray-300">{user.description}</p>
				</section>

				{socials && Object.keys(socials).length > 0 && (
					<section>
						<h2 className="text-xl font-semibold mb-2">Socials</h2>
						<ul className="flex space-x-4">
							{Object.entries(socials).map(([platform, url]) => (
								<li key={platform}>
									<a
										href={url as string}
										target="_blank"
										rel="noopener noreferrer"
										className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
									>
										{platformIcons[platform.toLowerCase()] ||
											platformIcons["default"]}
									</a>
								</li>
							))}
						</ul>
					</section>
				)}
				<section className="my-8">
					<h2 className="text-xl font-semibold mb-2">Recent Post</h2>
					<BlogPosts username={user.username} limit={3} />
				</section>
				<section>
					<h2 className="text-xl font-semibold mb-2">Contact</h2>
					{user.contact && <Contact email={user.contact.email} />}
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default MinimalistTemplate;
