import React from "react";
import { IUserData } from "@/lib/models/user.model";
import Image from "next/image";

interface ModernTemplateProps {
  user: IUserData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-blue-600 p-4 sm:p-6 md:p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-xl mt-2">{user.title}</p>
            </div>
            {user.image && (
              <Image
                src={user.image}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full border-4 border-white"
              />
            )}
          </div>
        </div>
        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-700">{user.bio}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Contact</h2>
            <p className="text-gray-700">{user.email}</p>
          </div>
          {user.socialLinks && Object.keys(user.socialLinks).length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">Social Links</h2>
              <ul>
                {Object.keys(user.socialLinks).map((link, index) => (
                  <li key={index}>
                    <a href={user.socialLinks[link]} target="_blank" rel="noopener noreferrer">
                      {link}
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

export default ModernTemplate;
