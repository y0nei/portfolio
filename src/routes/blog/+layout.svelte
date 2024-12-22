<script lang="ts">
    import type { Snippet } from "svelte";
    import ViewSource from "$lib/components/blog/ViewSource.svelte";
    import Icon from "$lib/components/IconLoader.svelte";
    import { page } from '$app/stores';

    const fileSource: string | null = $derived($page.data.source);

	let { children }: { children: Snippet } = $props();
</script>

<div class="blog-wrapper">
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
        </nav>
        {#if fileSource}
            <ViewSource href={fileSource}>
                <Icon name="github" size={16}/>
                View Source
            </ViewSource>
        {/if}
    </header>

    <div class="blog-content">
        {@render children()}
    </div>
</div>


<style lang="scss">
    :global(body) {
        background: var(--clr-background);
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 4rem;

        nav {
            display: inherit;
            gap: 1.75rem;

            a {
                font-size: 1.1rem;

                &:hover {
                    color: var(--clr-accent);
                }
            }
        }

        :global(a) {
            text-decoration: none;
            color: var(--clr-offwhite);
            font-family: "Rubik";
            font-size: 1rem;
            width: fit-content;
        }
    }

    .blog-wrapper {
        display: flex;
        flex-direction: column;
        padding: 0 25%;
    }

    .blog-content {
        margin: 3% 0;
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
