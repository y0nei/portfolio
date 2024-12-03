import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, url }) => {
	const collection = url.searchParams.get("collection");

	try {
		let post;
		// NOTE: Ternary operator didn't work inside import string
		if (collection) {
			post = await import(`$posts/${collection}/${params.slug}.md`)
		} else {
			post = await import(`$posts/${params.slug}.md`)
		}

		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) {
		error(404, `Post ${params.slug} not found`)
	}
}
