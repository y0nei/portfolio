import type { RequestHandler } from "./$types";
import type { Post } from "$lib/types";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, params }) => {
    const baseURL = new URL(url.origin + "/api/posts");
    baseURL.searchParams.set("slug", params.slug);

    try {
        const response = await fetch(baseURL);

        if (!response.ok) {
            throw new Error("Post not found");
        }

        const posts: Post[] = await response.json();

        if (!posts[0].coverImage) {
            throw new Error("Post doesn't contain a cover image");
        }

        const coverBytes = Uint8Array.from(
            atob(String(posts[0].coverImage)),
            c => c.charCodeAt(0)
        );

        return new Response(coverBytes);
    } catch (e) {
        return error(404, e.message);
    }
};
