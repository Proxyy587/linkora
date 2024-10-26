import Link from "next/link";

const navItems = {
	"/": { name: "Home" },
	"/blog": { name: "Blog" },
	"/contact": {
		name: "contact",
	},
};

export function Navbar() {
	return (
		<nav className="py-4 px-8 shadow-md bg-white text-gray-700 font-serif">
			<ul className="flex space-x-6">
				{Object.entries(navItems).map(([path, { name }]) => (
					<li key={path}>
						<Link href={path} legacyBehavior>
							<p className="hover:text-gray-900">{name}</p>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Navbar;
