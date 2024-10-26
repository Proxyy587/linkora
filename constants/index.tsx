import {
	Home,
	FileText,
	BarChart,
	Settings,
	HelpCircle,
	LogOut,
	User,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import {
	FaBehance,
	FaDiscord,
	FaDribbble,
	FaFacebook,
	FaLink,
	FaMedium,
	FaPinterest,
	FaReddit,
	FaSnapchat,
	FaTelegram,
	FaTiktok,
	FaTwitch,
	FaWhatsapp,
	FaYoutube,
} from "react-icons/fa";
import {
	AiFillGithub,
	AiFillTwitterCircle,
	AiFillLinkedin,
} from "react-icons/ai";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
export const dashboardSidebar = [
	{
		label: "Home",
		icon: Home,
		href: "/dashboard",
	},
	{
		label: "Profile",
		icon: User,
		href: "/dashboard/profile",
	},
	{
		label: "Blog Post",
		icon: FileText,
		href: "/dashboard/blog",
	},
	{
		label: "Domain",
		icon: BarChart,
		href: "/dashboard/domain",
	},
	{
		label: "Settings",
		icon: Settings,
		href: "/dashboard/settings",
	},
	{
		label: "Logout",
		icon: LogOut,
		href: "/logout",
	},
];

export const platformIcons: { [key: string]: React.ReactNode } = {
	github: <AiFillGithub size={24} />,
	twitter: <FaXTwitter size={24} />,
	x: <FaXTwitter size={24} />,
	instagram: <InstagramLogoIcon width={24} height={24} />,
	linkedin: <AiFillLinkedin size={24} />,
	facebook: <FaFacebook size={24} />,
	youtube: <FaYoutube size={24} />,
	tiktok: <FaTiktok size={24} />,
	pinterest: <FaPinterest size={24} />,
	snapchat: <FaSnapchat size={24} />,
	whatsapp: <FaWhatsapp size={24} />,
	telegram: <FaTelegram size={24} />,
	reddit: <FaReddit size={24} />,
	medium: <FaMedium size={24} />,
	behance: <FaBehance size={24} />,
	dribbble: <FaDribbble size={24} />,
	twitch: <FaTwitch size={24} />,
	discord: <FaDiscord size={24} />,
	default: <FaLink size={24} />,
};
