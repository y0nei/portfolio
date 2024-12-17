<script lang="ts">
    import type { Snippet } from "svelte";
    import ViewSource from "$lib/components/blog/ViewSource.svelte";
    import Icon from "$lib/components/IconLoader.svelte";
    import { page } from '$app/stores';

    const fileSource: string | null = $derived($page.data.source);

	let { children }: { children: Snippet } = $props();
</script>

<header>
    <nav>
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
    </nav>
    {#if fileSource}
        <ViewSource href={fileSource?.replace("[", "%5B").replace("]", "%5D")}>
            <Icon name="github" size={16}/>
            View Source
        </ViewSource>
    {/if}
</header>

<div class="blog-content">
    {@render children()}
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
        padding: 0 25%;

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

    .blog-content {
        margin: 3% 25%;
    }

    @media only screen and (max-width: 1000px) {
        header {
            padding: 0 18%;
        }
        .blog-content {
            margin: 3% 18%;
        }
    }
    @media only screen and (max-width: 750px) {
        header {
            padding: 0 15%;
        }
        .blog-content {
            margin: 3% 15%;
        }
    }
    @media only screen and (max-width: 580px) {
        header {
            padding: 0 8%;
        }
        .blog-content {
            margin: 3% 8%;
        }
    }
    @media only screen and (max-width: 500px) {
        header {
            padding: 0 5%;
        }
        .blog-content {
            margin: 3% 5%;
        }
    }
</style>
