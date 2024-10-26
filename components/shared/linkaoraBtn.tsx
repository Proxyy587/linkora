import React from "react";
import Link from "next/link";

const LinkaoraBtn: React.FC = () => {
	return (
		<Link
			href="https://linkora.io"
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-4 right-4 px-3 py-2 text-xs font-medium text-primary-foreground bg-primary rounded-md shadow-sm hover:bg-primary/90 transition-colors duration-200"
		>
			Made with Linkora
		</Link>
	);
};

export default LinkaoraBtn;
