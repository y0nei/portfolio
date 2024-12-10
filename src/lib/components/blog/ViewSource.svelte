<script lang="ts">
    import type { HTMLAnchorAttributes } from "svelte/elements";

    let { children, ...rest }: HTMLAnchorAttributes = $props();
</script>

<a {...rest}>{@render children?.()}</a>

<style lang="scss">
    a {
        display: flex;
        width: fit-content;
        align-items: center;
        gap: 0.2rem;
        padding: 4px 7px;

        background-color: var(--clr-background-alt);
        border-radius: calc(var(--border-radius) / 1.5);
        transition: ease 150ms;

        &:hover {
            background-color: var(--clr-accent-dark);
        }

        :global(.svg-container) {
            margin-right: 2px;

            :global(svg) {
                fill: white;
            }
        };
    }
</style>
