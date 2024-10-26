import React from "react";
import LinkaoraBtn from "@/components/shared/linkaoraBtn";

const DomainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{children}
			<LinkaoraBtn />
		</>
	);
};

export default DomainLayout;
