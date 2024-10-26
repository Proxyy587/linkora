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
import Footer from "@/app/[domain]/_components/classic/footer";
import Contact from "@/app/[domain]/_components/classic/contact";
import { platformIcons } from "@/constants";
import Navbar from "@/app/[domain]/_components/classic/nav";

interface ClassicTemplateProps {
	user: IUserData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ user }) => {
	const socials =
		user.socialLinks instanceof Map
			? Object.fromEntries(user.socialLinks)
			: user.socialLinks;

	return (
		<div className="max-w-3xl mx-auto px-6 py-12 bg-white text-gray-800 shadow-lg rounded-lg">
			<Navbar />
			<main className="space-y-10">
				<header>
					<h1 className="text-4xl font-extrabold text-gray-900">{user.name}</h1>
					<p className="text-lg text-gray-600">{user.title}</p>
				</header>
				<section className="space-y-4">
					<p>{user.bio}</p>
					<p>{user.description}</p>
				</section>
				{socials && Object.keys(socials).length > 0 && (
					<section>
						<h2 className="text-2xl font-semibold mb-3">Connect with Me</h2>
						<ul className="flex space-x-6">
							{Object.entries(socials).map(([platform, url]) => (
								<li key={platform}>
									<a
										href={url as string}
										target="_blank"
										rel="noopener noreferrer"
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
					<h2 className="text-2xl font-semibold mb-2">Contact Me</h2>
					<Contact email={user.email} />
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default ClassicTemplate;
