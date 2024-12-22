import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

// NOTE: Data not needed to be parsed on the client is passed into this function
// from `+page.server.ts`, and fordwarded to the svelte component.
export const load: PageLoad = async ({ params, data }) => {
	try {
		let post;

		// NOTE: Have to define a separate import each time due to Vite import limitations
		// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
		if (data.collection) {
			post = await import(`$posts/${data.collection}/${params.slug}.md`);
		} else if (data.inFolder) {
			post = await import(`$posts/${data.inFolder}/${params.slug}.md`);
		} else {
			post = await import(`$posts/${params.slug}.md`);
		}

		return {
			content: post.default,
			meta: post.metadata,
			collection: data.collection,
			source: data.source
		}
	} catch (e) {
		error(404, `Post ${params.slug} not found`)
	}
}
