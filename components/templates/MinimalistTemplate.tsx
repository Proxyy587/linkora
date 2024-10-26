import React from "react";
import { IUserData } from "@/lib/models/user.model";
import { FaLink } from "react-icons/fa";
import {
	AiFillGithub,
	AiFillTwitterCircle,
	AiFillLinkedin,
} from "react-icons/ai";
import { Navbar } from "@/app/[domain]/_components/minimalistic/nav";
import Footer from "@/app/[domain]/_components/minimalistic/footer";
import Contact from "@/app/[domain]/_components/minimalistic/contact";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { FaXTwitter } from "react-icons/fa6";

interface MinimalistTemplateProps {
	user: IUserData;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ user }) => {
	const socials = user.socialLinks;

	const platformIcons: { [key: string]: React.ReactNode } = {
		github: <AiFillGithub size={24} />,
		twitter: <FaXTwitter size={24} />,
		instagram: <InstagramLogoIcon width={24} height={24} />,
		linkedin: <AiFillLinkedin size={24} />,
		default: <FaLink size={24} />,
	};

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
						<h2 className="text-xl font-semibold mb-2">Connect</h2>
						<ul className="flex space-x-4">
							{Object.entries(socials).map(([platform, url]) => (
								<li key={platform}>
									<a
										href={url}
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
				<section>
					<h2 className="text-xl font-semibold mb-2">Contact</h2>
					<Contact email={user.email} />
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default MinimalistTemplate;
