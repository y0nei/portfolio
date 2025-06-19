import path from "path";
import { error, json } from "@sveltejs/kit";
import { searchForWorkspaceRoot } from "vite";
import type { Post } from "$lib/types";
import type { RequestHandler } from "./$types";

async function getCoverPath(nestedDir: string) {
	const coverImport = import.meta.glob([
		"$posts/**/cover.png"
	], { eager: true, import: "default" });

	for (const coverPath in coverImport) {
		if (nestedDir === coverPath.split("/").at(-2)) {
			return coverImport[coverPath] as string;
		};
	};
}

async function getPosts(slug?: string) {
	let posts: Post[] = [];

	const imports = import.meta.glob(["$posts/*.md", "$posts/*/*.md"], { eager: true });

	for (const importPath in imports) {
		const file = imports[importPath];
		const pathParts = importPath.split("/");
		const slug = pathParts.at(-1)?.replace(".md", "");

		// Check if the path has enough parts to contain a nested folder
		const nested = pathParts.length > 3 ? pathParts[2] : undefined;

		// Fetch cover image data from post if its in a folder
		// TODO: Find a cleaner way to do this, until then we ball
		let postCover;
		if (nested) {
			let imagePath = await getCoverPath(nested);

			if (imagePath) {
				// Escape special characters if assets are under a collection
				if (imagePath.includes("%5B") && imagePath.includes("%5D")) {
					imagePath = imagePath.replace("%5B", "\[").replace("%5D", "\]");
				}

				// HACK: Add missing directory to the path if asset is fetched from a build (prod) environment
				if (imagePath.startsWith("/_app/immutable")) {
					imagePath = "/client" + imagePath;
				}

				const assetPath = path.join(searchForWorkspaceRoot(process.cwd()), imagePath);
				const coverBytes = await Bun.file(assetPath).bytes();
				postCover = btoa(String.fromCharCode(...coverBytes));
			}
		}

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<Post, "slug">;
			const post = { ...metadata, slug } satisfies Post;

			// Set collections based on a reserved folder prefix & postfix character
			if (nested) {
				if (nested.startsWith("[") && nested.endsWith("]")) {
					post.collection = nested;
				} else {
					post.inFolder = nested;
				}
			}

			if (postCover) {
				post.coverImage = postCover;
			}

			if (post.published) {
				posts.push(post);
			};
		};
	};

	slug && (posts = posts.filter(item => item.slug === slug));

    // TODO: Move this out and add more filtering options
	posts = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
};

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get("slug");

	try {
        const posts: Post[] = await getPosts(slug || undefined);

        if (posts.length === 0) {
            throw new Error("No posts found");
        }

        return json(posts);
    } catch (e) {
        return error(404, e.message);
	}
};
