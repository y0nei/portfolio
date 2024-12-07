import { json } from "@sveltejs/kit";
import type { Post } from "$lib/types";
import type { RequestHandler } from "./$types";

async function getPosts() {
	let posts: Post[] = [];

	const imports = {
		...import.meta.glob("$posts/*.md", { eager: true }),
		...import.meta.glob("$posts/*/*.md", { eager: true })
	};

	for (const path in imports) {
		const file = imports[path];
		const pathParts = path.split("/");
		const slug = pathParts.at(-1)?.replace(".md", "");

		// Check if the path has enough parts to contain a nested folder
		const collection = pathParts.length > 3 ? pathParts[2] : undefined;

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<Post, "slug">;
			const post = { ...metadata, slug } satisfies Post;

			// Set collections based on a reserved folder prefix & postfix character
			if (collection && collection.startsWith("[") && collection.endsWith("]")) {
				post.collection = collection
			}

			if (post.published) {
				posts.push(post);
			};
		};
	};

    // TODO: Move this out and add more filtering options
	posts = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
};

export const GET: RequestHandler = async () => {
    const posts = await getPosts();
    return json(posts);
};
