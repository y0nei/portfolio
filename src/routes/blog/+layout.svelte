<script lang="ts">
    import type { Snippet } from "svelte";
    import { page } from "$app/stores";
    import BlogHeader from "$lib/components/blog/BlogHeader.svelte";
	import "@fontsource/atkinson-hyperlegible";

    const fileSource: Nullable<string> = $derived($page.data.source);

	let { children }: { children: Snippet } = $props();
</script>

{#if $page.url.pathname.includes("/cover")}
    {@render children()}
{:else}
    <div class="blog-wrapper">
        <BlogHeader gitSource={fileSource} />
        {@render children()}
    </div>
{/if}

<style lang="scss" global>
    body {
        background: var(--clr-background);
    }

    .blog-wrapper {
        display: flex;
        flex-direction: column;
        padding: 0 25%;

        @media only screen and (max-width: 1000px) {
            padding: 0 18%;
        }
        @media only screen and (max-width: 750px) {
            padding: 0 10%;
        }
        @media only screen and (max-width: 580px) {
            padding: 0 7%;
        }
        @media only screen and (max-width: 500px) {
            padding: 0 3%;
        }
    }
</style>
