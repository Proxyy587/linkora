import React from "react";
import { IUserData } from "@/lib/models/user.model";
import Image from "next/image";

interface ClassicTemplateProps {
	user: IUserData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ user }) => {
	return (
		<div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
				<div className="p-4 sm:p-6 md:p-8">
					<div className="text-center mb-8">
						{user.image && (
							<Image
								src={user.image}
								alt={user.name}
								width={150}
								height={150}
								className="rounded-full mx-auto mb-4"
							/>
						)}
						<h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
						<p className="text-xl text-gray-600 mt-2">{user.title}</p>
					</div>
					<div className="mb-6">
						<h2 className="text-2xl font-semibold mb-2 text-gray-800">
							About Me
						</h2>
						<p className="text-gray-700">{user.bio}</p>
					</div>
					<div className="mb-6">
						<h2 className="text-2xl font-semibold mb-2 text-gray-800">
							Contact
						</h2>
						<p className="text-gray-700">{user.email}</p>
					</div>
					{user.socialLinks && Object.keys(user.socialLinks).length > 0 && (
						<div>
							<h2 className="text-2xl font-semibold mb-2 text-gray-800">
								Social Links
							</h2>
							<ul className="list-disc pl-5">
								{Object.entries(user.socialLinks).map(([platform, url]) => (
									<li key={platform}>
										<a
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:underline"
										>
											{platform}
										</a>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ClassicTemplate;
