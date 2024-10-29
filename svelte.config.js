// import adapter from '@sveltejs/adapter-auto';
import adapter from "svelte-adapter-bun";
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess(),
	kit: { 
		adapter: adapter(),
		alias : {
			"$icons": "static/icons"
		}
	},
};

export default config;
