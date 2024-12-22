import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import path from "path";

// NOTE: Process some variables server side & leave Markdown dynamic importing and PageData
// passing in `+page.ts`, since Vite dynamic imports won't resolve the Promise in this file.
export const load: PageServerLoad = async ({ params, url, parent }) => {
	const collection = url.searchParams.get("collection");
	const { gitHTTPUrl, posts } = await parent();

	try {
        const postData = posts.filter(post => post.slug === params.slug);
		const gitFileSource = path.join(
            gitHTTPUrl,
            "posts",
            collection || "",
            postData[0].inFolder || "",
            url.pathname.replace("/blog", "")
        ) + ".md";

		return {
            inFolder: postData[0].inFolder,
			collection,
			source: gitFileSource,
		}
	} catch (e) {
		error(404, `Post ${params.slug} not found`)
	}
}

