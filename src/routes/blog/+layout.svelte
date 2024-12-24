<script lang="ts">
    import type { Snippet } from "svelte";
    import { page } from "$app/stores";
    import BlogHeader from "$lib/components/blog/BlogHeader.svelte";
	import "@fontsource/atkinson-hyperlegible";

    const fileSource: Nullable<string> = $derived($page.data.source);

	let { children }: { children: Snippet } = $props();
</script>

<div class="blog-wrapper">
    <BlogHeader gitSource={fileSource} />
    {@render children()}
</div>

<style lang="scss" global>
    body {
        background: var(--clr-background);
    }

    .blog-wrapper {
        display: flex;
        flex-direction: column;
        padding: 0 25%;
    }

    @media only screen and (max-width: 1000px) {
        .blog-wrapper {
            padding: 0 18%;
        }
    }
    @media only screen and (max-width: 750px) {
        .blog-wrapper {
            padding: 0 15%;
        }
    }
    @media only screen and (max-width: 580px) {
        .blog-wrapper {
            padding: 0 8%;
        }
    }
    @media only screen and (max-width: 500px) {
        .blog-wrapper {
            padding: 0 5%;
        }
    }
</style>
