function ArrowIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="transition-transform group-hover:translate-x-1"
		>
			<path
				d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const footerLinks = [
		{ href: "/rss", label: "RSS" },
		{ href: "https://github.com/vercel/next.js", label: "GitHub" },
		{
			href: "https://vercel.com/templates/next.js/portfolio-starter-kit",
			label: "View Source",
		},
	];

	return (
		<footer className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-700">
			<nav>
				<ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-neutral-600 dark:text-neutral-300">
					{footerLinks.map(({ href, label }) => (
						<li key={href}>
							<a
								className="group flex items-center transition-colors hover:text-neutral-800 dark:hover:text-neutral-100"
								rel="noopener noreferrer"
								target="_blank"
								href={href}
							>
								<ArrowIcon />
								<span className="ml-2">{label}</span>
							</a>
						</li>
					))}
				</ul>
			</nav>
			<p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-300">
				© {currentYear}{" "}
				<a
					href="https://abhijee.com"
					className="underline text-accent-foreground"
				>
					{" "}
					Proxy
				</a>
				. All Rights Reserved.
			</p>
		</footer>
	);
}
