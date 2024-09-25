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
        }
    }
</style>
