import type { LayoutServerLoad } from "./$types";
import type { Post } from "$lib/types";

export const load: LayoutServerLoad = async ({ url }) => {
	const response = await fetch(url.origin + "/api/posts");
	const posts: Post[] = await response.json();

	return { posts };
};

