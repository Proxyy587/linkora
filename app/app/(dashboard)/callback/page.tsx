import { authenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function CallbackPage() {
	const auth = await authenticateUser();
	if (auth.status === 200 || auth.status === 201) {
		return redirect("/dashboard");
	}

	if (auth.status === 403 || auth.status === 500) {
		console.log("Problems with authentication");
		return redirect("/signin");
	}
}
