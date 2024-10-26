function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-12 py-8 bg-gray-900 text-gray-400 text-center">
			<p>© {currentYear} Modern Portfolio. All rights reserved.</p>
			<ul className="flex justify-center space-x-4 mt-2">
				<li>
					<a href="/rss" className="hover:text-primary">
						RSS
					</a>
				</li>
				<li>
					<a href="https://github.com" className="hover:text-primary">
						GitHub
					</a>
				</li>
				<li>
					<a href="https://vercel.com" className="hover:text-primary">
						Source
					</a>
				</li>
			</ul>
		</footer>
	);
}

export default Footer;
