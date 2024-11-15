"use server";

import nodemailer from "nodemailer";

export async function sendEmail(
	to: string,
	from: string,
	subject: string,
	text: string,
	name: string
) {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASS,
			},
		});

		const info = await transporter.sendMail({
			from,
			to,
			subject,
			html: `
            <html>
            <body style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #111827;">
            <div style="background-color: #1e293b; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #e2e8f0; margin-bottom: 20px; font-weight: 600;">New Message from Linkora Profile</h2>
            <p style="color: #cbd5e1; line-height: 1.6;">
            You received a new message from: <strong style="color: #60a5fa">${name}</strong>   
            </p>
            <div style="background-color: #334155; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0; border-radius: 6px;">
            <p style="color: #e2e8f0; line-height: 1.6;">${text}</p>
            </div>
            <p style="color: #64748b; font-size: 0.9em; margin-top: 20px;">
            This message was sent via Linkora's contact form.
            </p>
            </div>
            </div>
            </body>
            </html>
			`,
		});

		console.log("Message sent: %s", info.messageId);
		return { success: true, message: "Email sent successfully" };
	} catch (error) {
		console.error("Error sending email:", error);
		return { success: false, message: "Failed to send email" };
	}
}
