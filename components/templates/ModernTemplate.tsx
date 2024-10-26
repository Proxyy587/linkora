import React from "react";
import { IUserData } from "@/lib/models/user.model";
import Image from "next/image";
import { platformIcons } from "@/constants";

interface ModernTemplateProps {
  user: IUserData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ user }) => {
  const socials = user.socialLinks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 sm:p-10 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">{user.name}</h1>
                <p className="text-xl mt-2 font-light">{user.title}</p>
              </div>
              {user.image && (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              )}
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">About Me</h2>
              <p className="text-gray-600 leading-relaxed">{user.bio}</p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">Contact</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            {socials && Object.keys(socials).length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">Connect</h2>
                <ul className="flex flex-wrap gap-4">
                  {Object.entries(socials).map(([platform, url]) => (
                    <li key={platform}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
                      >
                        {platformIcons[platform.toLowerCase()] || platformIcons["default"]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
