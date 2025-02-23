<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        name: string,
        hollow?: boolean,
        header?: Snippet,
        additional?: Snippet,
        children: Snippet
    }

    let { hollow = false, name, header, additional, children }: Props = $props();
</script>

<div class:section={hollow ? undefined : true}
     class="bento-item {name && 'section-' + name}"
>
    {#if header}
        <header>
            <div class="badge-header">
                {@render header()}
            </div>
            {@render additional?.()}
        </header>
    {/if}
    {@render children()}
</div>

<style lang="scss" global>
    .bento-item {
        header {
            font-family: "Rubik";
            display: flex;
            justify-content: space-between;
            margin: 5px;

            .badge-header {
                color: var(--clr-text);
                display: flex;
                align-items: center;
                gap: 0.33rem;
                width: fit-content;
                font-size: 0.9rem;
                padding: 5px 8px;
                border-radius: calc(var(--border-radius) - 5px);
                background-color: var(--clr-bento-border);
                box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
            }
        }

        &.section {
            display: flex;
            flex-direction: column;
            font-family: "Rubik";
            color: var(--clr-text);
            background-color: var(--clr-bento-background);
            border: 1px solid var(--clr-bento-border);
            border-radius: var(--border-radius);
        }
    }
</style>
