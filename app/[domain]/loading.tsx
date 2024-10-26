import React from "react";

export default function Loading() {
	return (
		<div className="flex items-center justify-center w-full h-screen">
			<div className="animate-spin rounded-full h-2 w-2 border-t-2 border-b-2 border-gray-900"></div>
		</div>
	);
}
