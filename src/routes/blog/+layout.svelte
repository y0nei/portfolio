<script lang="ts">
    import type { Snippet } from "svelte";
    import Icon from "$lib/components/IconLoader.svelte";
    import HeaderButton from "$lib/components/blog/headerButton.svelte";
    import { page } from '$app/stores';

    const fileSource: string | null = $derived($page.data.source);

	let { children }: { children: Snippet } = $props();
</script>

<!-- TODO: Add view on GitHub button for article page -->
<header>
    <HeaderButton href="/">
        <Icon name="arrow-left" size={20} />
        home
    </HeaderButton>
    {#if fileSource}
        <HeaderButton href={fileSource}>
            View Source
        </HeaderButton>
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
        width: 100%;
        padding: 1rem;
        border-bottom: 1px solid var(--clr-background-alt);
    }

    .blog-content {
        margin: 3% 25%;
        border: 1px solid white;
    }
</style>
