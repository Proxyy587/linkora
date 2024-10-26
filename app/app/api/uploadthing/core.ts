import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		.middleware(async ({ req }) => {
			const { userId } = auth();
			if (!userId) throw new UploadThingError("Unauthorized");
			return { userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Upload complete for userId:", metadata.userId);
			console.log("file url", file.url);

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
