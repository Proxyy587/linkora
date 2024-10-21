import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
	return (
		<div className="grid w-full grow items-center px-4 sm:justify-center">
			<Card className="w-full sm:w-96">
				<CardHeader>
					<Skeleton className="h-6 w-3/4 mb-2" />
					<Skeleton className="h-4 w-full" />
				</CardHeader>
				<CardContent className="space-y-4">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</CardContent>
			</Card>
		</div>
	);
}
