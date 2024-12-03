// import adapter from '@sveltejs/adapter-auto';
import adapter from "svelte-adapter-bun";
import { sveltePreprocess } from "svelte-preprocess";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ".md"],
	preprocess: [sveltePreprocess(), mdsvex({extension: ".md"})],
	kit: {
		adapter: adapter(),
		alias : {
			"$icons": "static/icons",
			"$posts": "posts"
		}
	}
};

export default config;
