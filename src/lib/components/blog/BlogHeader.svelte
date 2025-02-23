<script lang="ts">
    import ViewSource from "$lib/components/blog/ViewSource.svelte";

    interface Props {
        gitSource: Nullable<string>,
    }

    let { gitSource }: Props = $props();
</script>

<header>
    <nav>
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
    </nav>
    {#if gitSource}
        <ViewSource href={gitSource} />
    {/if}
</header>

<style lang="scss">
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 4rem;
        margin-bottom: 2.5rem;

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
</style>
