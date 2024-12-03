<script lang="ts">
    import type { Snippet } from "svelte";
    import Icon from "$lib/components/IconLoader.svelte";
    import HeaderButton from "$lib/components/blog/headerButton.svelte";

	let { children }: { children: Snippet } = $props();
</script>

<header>
    <HeaderButton href="/">
        <Icon name="arrow-left" size={20} />
        home
    </HeaderButton>
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
