"use client";

import { sendEmail } from "@/actions/sendEmail";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

const Contact = ({ email }: { email: string }) => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const toEmail = email;
		const fromEmail = process.env.NODEMAILER_USER!;
		const subject = "New message from " + name;
		const text = message;

		try {
			setLoading(true);
			const res = await sendEmail(toEmail, fromEmail, subject, text, name);
			if (res.success) {
				toast.success("Message sent successfully!");
				setName("");
				setMessage("");
			} else {
				toast.error("Failed to send message. Please try again.");
			}
		} catch (error) {
			toast.error("Something went wrong. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-3 md:mt-0 w-full h-64 rounded-lg bg-[#f7f2f2] dark:bg-[#191919] px-2">
			<p className="px-2 py-1 font-semibold text-md pt-2">Drop a message</p>

			<div className="mt-1">
				<form className="px-1" onSubmit={handleSubmit}>
					<div className="space-y-2 w-full">
						<input
							className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							placeholder={`eg: ${email}`}
							value={name}
							onChange={(e) => setName(e.target.value)}
							id="email-input"
							aria-describedby="email-input-description"
							aria-invalid="false"
							name="email"
							type="email"
						/>
					</div>
					<div className="mt-2 flex gap-3 w-full">
						<div className="space-y-2 w-full">
							<textarea
								className="flex min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-28 w-full"
								placeholder="Hey, wassup ?"
								name="message"
								id="message-input"
								aria-describedby="message-input-description"
								aria-invalid="false"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							></textarea>
						</div>
					</div>
					<div className="mt-3 flex justify-end">
						<button
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 w-36 h-8"
							type="submit"
							disabled={loading}
						>
							{loading ? (
								<FaSpinner className="animate-spin" />
							) : (
								"Send"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Contact;
