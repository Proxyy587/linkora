import React from "react";
import { IUserData } from "@/lib/models/user.model";
import { FaEnvelope, FaLink } from "react-icons/fa";
import {
	AiFillGithub,
	AiFillTwitterCircle,
	AiFillLinkedin,
} from "react-icons/ai";

interface MinimalistTemplateProps {
	user: IUserData;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ user }) => {
	const socials = user.socialLinks;

	const platformIcons: { [key: string]: React.ReactNode } = {
		github: (
			<AiFillGithub className="text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
		),
		twitter: (
			<AiFillTwitterCircle className="text-2xl text-blue-500 hover:text-blue-700" />
		),
		linkedin: (
			<AiFillLinkedin className="text-2xl text-blue-700 hover:text-blue-900" />
		),
		default: (
			<FaLink className="text-2xl text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white" />
		),
	};

	return (
		<section className="wrapper container mx-auto">
			<h1 className="mb-4 text-xl font-medium tracking-tight">My Portfolio</h1>
			<h1 className="mb-8 text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
				{user.name}
			</h1>
			<h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
				{user.title}
			</h2>
			<p className="mb-4 mt-2 text-gray-700 dark:text-gray-400">{user.bio}</p>
			<p className="mb-6 text-gray-600 dark:text-gray-400 italic">
				{user.description}
			</p>

			{/* Contact Section */}
			<div className="mt-6">
				<h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
					Contact
				</h2>
				<div className="flex items-center space-x-2">
					<FaEnvelope className="text-xl text-gray-600 dark:text-gray-300" />
					<p className="text-gray-700 dark:text-gray-300">{user.email}</p>
				</div>
			</div>

			{socials && Object.keys(socials).length > 0 && (
				<div className="mt-8">
					<h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
						Social Links
					</h2>
					<ul className="flex space-x-4">
						{Object.entries(socials).map(([platform, url]) => (
							<li key={platform}>
								<a
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-2 text-blue-600 hover:underline"
								>
									{platformIcons[platform] || platformIcons["default"]}
									<span className="hidden sm:inline-block capitalize">
										{platform}
									</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</section>
	);
};

export default MinimalistTemplate;
