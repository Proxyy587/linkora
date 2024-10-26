"use client";

import React, { useState } from "react";

const Contact = ({ email }: { email: string }) => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(name, message);
	};

	return (
		<div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
			<h3 className="text-lg font-bold mb-4">Contact Me</h3>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Your Name"
						className="w-full p-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<div className="mb-4">
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Your Message"
						className="w-full p-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
					/>
				</div>
				<button
					type="submit"
					className="bg-primary px-4 py-2 rounded-md hover:bg-primary-dark"
				>
					Send
				</button>
			</form>
		</div>
	);
};

export default Contact;
