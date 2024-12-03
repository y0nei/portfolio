<script lang="ts">
    import type { HTMLAnchorAttributes } from "svelte/elements";

    let { children, ...rest }: HTMLAnchorAttributes = $props();
</script>

<a {...rest}>{@render children?.()}</a>

<style lang="scss">
    a {
        display: flex;
        text-decoration: none;
        color: white;
        font-family: "Rubik";
        font-weight: 450;
        font-size: 1.15rem;
        width: fit-content;
        align-items: center;
        text-transform: uppercase;
        gap: 0.2rem;
        padding: 4px 6px;
        padding-right: 10px;

        background-color: var(--clr-background-alt);
        border-radius: calc(var(--border-radius) / 1.5);
        transition: ease 150ms;

        &:hover {
            background-color: var(--clr-accent-dark);
        }
    }
</style>
