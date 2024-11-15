import Link from "next/link";

const navItems = {
	"/": { name: "Home" },
	"/projects": { name: "Projects" },
	"/contact": { name: "Contact" },
};

export function Navbar() {
	return (
		<nav className="py-4 px-8 bg-gray-900 text-gray-100">
			<ul className="flex space-x-6">
				{Object.entries(navItems).map(([path, { name }]) => (
					<li key={path}>
						<Link href={path} legacyBehavior>
							<a className="hover:text-primary transition-colors duration-200">
								{name}
							</a>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Navbar;
