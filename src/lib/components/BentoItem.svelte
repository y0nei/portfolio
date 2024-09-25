<script lang="ts">
    export let hollow: boolean = false;
    export let name: string | any = undefined;
</script>

<div class:section={hollow ? undefined : true}
     class="bento-item {name && 'section-' + name}"
>
    {#if $$slots.header}
        <header>
            <div class="badge-header">
                <slot name="header" />
            </div>
        </header>
    {/if}
    <slot />
</div>

<style lang="scss" global>
    .bento-item {
        header {
            font-family: "Rubik";
            display: flex;
            justify-content: space-between;

            .badge-header {
                color: var(--text-color);
                display: flex;
                align-items: center;
                gap: 0.33rem;
                width: fit-content;
                font-size: 0.9rem;
                padding: 5px 8px;
                margin: 5px;
                border-radius: calc(var(--border-radius) - 5px);
                background-color: #454549;
                box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
            }
        }

        &.section {
            display: flex;
            flex-direction: column;
            font-family: "Rubik";
            color: var(--text-color);
            background-color: #323235;
            border: 1px solid #454549;
            border-radius: var(--border-radius);

            &-handles {
                padding: 5px;
                padding-left: 12px;
                justify-content: space-around;
            }
            &-buttons {
                display: flex;
                flex-direction: column;
                gap: inherit;
                white-space: nowrap;
            }

            // Grid layouts
            &-handles {
                grid-column: 1;
                grid-row: 1 / span 2;
            }
            &-webrings {
                grid-column: 2;
                grid-row: 2;
            }
            &-badges {
                grid-column: 2 / span 2;
                grid-row: 1;
            }
            &-buttons {
                grid-column: 3;
                grid-row: 2;
            } 
        }
    }
</style>
