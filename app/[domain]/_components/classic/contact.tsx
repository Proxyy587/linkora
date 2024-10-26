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
		<div className="bg-gray-100 p-6 rounded-lg shadow-md font-serif">
			<h3 className="text-lg font-bold mb-2">Drop a Message</h3>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Your name"
						className="w-full p-2 border border-gray-300 rounded-md"
					/>
				</div>
				<div className="mb-4">
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Your message"
						className="w-full p-2 border border-gray-300 rounded-md"
					/>
				</div>
				<button
					type="submit"
					className="bg-gray-800 text-white px-4 py-2 rounded-md"
				>
					Send
				</button>
			</form>
		</div>
	);
};

export default Contact;
