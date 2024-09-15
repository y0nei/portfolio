<script lang="ts">
    export let hollow: boolean = false;
    export let name: string | any = undefined;
</script>

<div class:section={hollow ? undefined : true}
     class="bento-item {name && 'section-' + name}">
    <slot />
</div>

<style lang="scss" global>
    .bento-item {
        gap: inherit;

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
