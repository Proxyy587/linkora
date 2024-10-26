function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-gray-300 mt-12 py-8 text-center text-gray-600 font-serif">
			<p className="mb-4">
				© {currentYear} Classic Portfolio. All rights reserved.
			</p>
			<ul className="flex justify-center space-x-4">
				<li>
					<a href="/rss" className="hover:underline">
						RSS
					</a>
				</li>
				<li>
					<a href="https://github.com" className="hover:underline">
						GitHub
					</a>
				</li>
				<li>
					<a href="https://vercel.com" className="hover:underline">
						Source
					</a>
				</li>
			</ul>
		</footer>
	);
}

export default Footer;
