import {
	Home,
	FileText,
	BarChart,
	Settings,
	HelpCircle,
	LogOut,
    User,
} from "lucide-react";

export const dashboardSidebar = [
	{
		label: "Home",
		icon: Home,
		href: "/dashboard",
	},
    {
        label: "Socials",
        icon: User,
        href: "/dashboard/social-links",
    },
	{
		label: "Blog Post",
		icon: FileText,
		href: "/dashboard/blog",
	},
	{
		label: "Analytics",
		icon: BarChart,
		href: "/dashboard/analytics",
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
