import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, url, parent }) => {
	// BUG: Importing the function directly casues a race condition(?)
	const { gitHTTPUrl, posts } = await parent();
	const collection = url.searchParams.get("collection");
	const postData = posts.filter(post => post.slug === params.slug);

	try {
		let post, path = "";
		// NOTE: Ternary operator didn't work inside import string
		if (collection) {
			post = await import(`$posts/${collection}/${params.slug}.md`);
			path = "/" + collection;
		} else if (postData[0].inFolder) {
			post = await import(`$posts/${postData[0].inFolder}/${params.slug}.md`);
		} else {
			post = await import(`$posts/${params.slug}.md`);
		}

		let gitFileSource: string = gitHTTPUrl + "/posts" + path;
		if (postData[0].inFolder) {
			gitFileSource = gitFileSource + "/" + postData[0].inFolder;
		}
		gitFileSource = gitFileSource + url.pathname.replace("/blog", "") + ".md";

		return {
			content: post.default,
			meta: post.metadata,
			collection: collection,
			source: gitFileSource,
		}
	} catch (e) {
		error(404, `Post ${params.slug} not found`)
	}
}
