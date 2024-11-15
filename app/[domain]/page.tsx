import { getUserByEmail } from "@/actions/getUserByEmail";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import MinimalistTemplate from "@/components/templates/MinimalistTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import { notFound } from "next/navigation";
import { IUserData } from "@/lib/models/user.model";
import Script from "next/script";

interface DomainPageProps {
	params: { domain: string };
}

export default async function DomainPage({ params }: DomainPageProps) {
	const domain = params.domain.split(".")[0];
	const user = await getUserByEmail(domain);

	if (!user) {
		notFound();
	}

	const defaultUser: IUserData = {
		name: "",
		username: "",
		contact: {
			email: "",
			phone: "",
		},
		templateTheme: "minimalist",
		socialLinks: {},
	};

	const fullUser: IUserData = { ...defaultUser, ...user };
	console.log(fullUser);

	const renderTemplate = () => {
		switch (fullUser.templateTheme) {
			case "modern":
				return <ModernTemplate user={fullUser} />;
			case "classic":
				return <ClassicTemplate user={fullUser} />;
			case "minimalist":
				return <MinimalistTemplate user={fullUser} />;
			default:
				return <ModernTemplate user={fullUser} />;
		}
	};

	return (
		<>
			{renderTemplate()}
			<Script
				id="analytics-script"
				strategy="afterInteractive"
				src="/tracking-script.js"
				data-domain={params.domain}
			/>
		</>
	);
}
