import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import YAMLPlugin from "unplugin-yaml/vite";
import path from "path";

export default defineConfig({
	plugins: [sveltekit(), YAMLPlugin()],
	server: {
		fs: {
        	allow: [
				path.join(searchForWorkspaceRoot(process.cwd()), "posts")
			]
		}
	}
});
