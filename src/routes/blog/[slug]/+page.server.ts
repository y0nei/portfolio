import { error } from "@sveltejs/kit";
import { render } from "svelte/server";
import type { PageServerLoad } from "./$types";
import path from "path";

export const load: PageServerLoad = async ({ params, url, parent }) => {
	const collection = url.searchParams.get("collection");
	const collectionFolder = collection ? `[${collection}]` : "";
	const { gitHTTPUrl, posts } = await parent();

	try {
        const postData = posts.filter(post => post.slug === params.slug);

		// NOTE: Have to define a separate import each time due to Vite import limitations
		// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
		let post;
		if (collection) {
			post = await import(`$posts/${collectionFolder}/${params.slug}.md`);
		} else if (postData[0].inFolder) {
			post = await import(`$posts/${postData[0].inFolder}/${params.slug}.md`);
		} else {
			post = await import(`$posts/${params.slug}.md`);
		}

		const gitFileSource = new URL(path.join(
            "posts",
            encodeURIComponent(collectionFolder),
            postData[0].inFolder || "",
            url.pathname.replace("/blog", "") + ".md"
        ), gitHTTPUrl + "/");

		return {
			content: render(post.default).body,
			meta: post.metadata,
			collection,
			source: gitFileSource.href,
		}
	} catch (e) {
		error(404, `Post ${params.slug} not found`)
	}
}

