import { sveltekit } from "@sveltejs/kit/vite";
import ViteYaml from "@modyfi/vite-plugin-yaml";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import path from "path";

export default defineConfig({
	plugins: [sveltekit(), ViteYaml()],
	server: {
		fs: {
        	allow: [
				path.join(searchForWorkspaceRoot(process.cwd()), "posts")
			]
		}
	}
});
