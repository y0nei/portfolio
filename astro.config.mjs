import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import icon from "astro-icon";
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
    vite: {
      plugins: [yaml()]
    },
    integrations: [
        svelte(),
        icon({ iconDir: "public/icons" })
    ]
});
