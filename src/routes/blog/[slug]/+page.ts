import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, url, parent }) => {
	// BUG: Importing the function directly casues a race condition(?)
	const { gitHTTPUrl } = await parent();
	const collection = url.searchParams.get("collection");

	try {
		let post, path = "";
		// NOTE: Ternary operator didn't work inside import string
		if (collection) {
			post = await import(`$posts/${collection}/${params.slug}.md`);
			path = "/" + collection;
		} else {
			post = await import(`$posts/${params.slug}.md`);
		}

		const gitFileSource = gitHTTPUrl + "/posts" + path + url.pathname.replace("/blog", "") + ".md";

		return {
			content: post.default,
			meta: post.metadata,
			source: gitFileSource,
		}
	} catch (e) {
		error(404, `Post ${params.slug} not found`)
	}
}
