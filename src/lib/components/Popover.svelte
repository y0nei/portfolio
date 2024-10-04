<script lang="ts">
    // TODO: Maybe add multiple types like with_button, collapsable, tooltip
    export let collapsible: {
        title: string;
    }
</script>

<span class="popover-tooltip {$$props.class || ''}">
    <slot />
    {#if $$slots.collapsible && collapsible.title != undefined}
        <div class="wrap-collapsible">
            <input id="collapsible" class="toggle" type="checkbox">
            <label for="collapsible" class="lbl-toggle">{collapsible.title}</label>
            <div class="collapsible-content">
                <div class="content-inner">
                    <slot name="collapsible" />
                </div>
            </div>
        </div>
    {/if}
</span>

<style lang="scss" global>
    .popover-tooltip {
        // Don't forget to set the hover-color variable

        transition-duration: 150ms;
        opacity: 0;
        visibility: hidden;
        background-color: var(--hover-color);
        color: var(--text-color);
        text-align: center;
        border-radius: calc(var(--border-radius) / 2);
        display: flex;
        flex-direction: column;
        padding: 5px 12px;

        position: absolute;
        bottom: 130%;
        z-index: 1;

        // Arrow
        &::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: var(--hover-color) transparent transparent transparent;
        }
    }

    .wrap-collapsible {
        color: var(--text-color);

        input[type="checkbox"] {
            display: none;
        }

        .lbl-toggle {
            display: block;
            text-align: center;
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 5px;
            padding: 5px 7px;
            margin-top: 5px;
            transition: all 0.25s ease-out;

            &:hover {
                background-color: rgba(0, 0, 0, 0.65);
            }

            // The triangle
            &::before {
                content: " ";
                display: inline-block;

                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-left: 5px solid currentColor;

                vertical-align: middle;
                margin-right: .5rem;
                transform: translateY(-2px);
                transition: transform .2s ease-out;
            }
        }

        .collapsible-content {
            max-height: 0px;
            overflow: hidden;
            transition: max-height .25s ease-in-out;

            .content-inner {
                background-color: rgba(0, 0, 0, 0.33);
                border-bottom-left-radius: 0.35rem;
                border-bottom-right-radius: 0.35rem;
                padding: 5px;
            }
        }

        .toggle:checked + .lbl-toggle {
            border-bottom-right-radius: 0;
            border-bottom-left-radius: 0;

            & + .collapsible-content {
                max-height: 100vh;
            }

            // Rotate the triangle
            &::before {
                transform: rotate(90deg) translateX(-3px);
            }
        }
    }
</style>
