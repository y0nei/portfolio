<script lang="ts">
    import "@fontsource/mononoki";
    import { copy } from "svelte-copy";
    import Icon from "$lib/components/IconLoader.svelte";

    export let platform: string;
    export let value: string;
    export let iconSize: number = 30;
</script>

<div class="social-handle">
    <Icon name={platform.toLocaleLowerCase()} size={iconSize} />
    <span>
        <p>{value}</p>
        <button use:copy={value}><Icon name="copy" size={16} /></button>
    </span>
</div>

<style lang="scss" global>
   .social-handle {
        --pill-border-radius: 0.6rem;
        display: flex;
        align-items: center;
        color: var(--text-color);
        font-family: "Mononoki", monospace;
        font-size: 1rem;

        span {
            display: inherit;
            align-items: inherit;
            justify-content: center;
            background-color: #242424;
            border: 1px dashed #555555;
            border-radius: var(--pill-border-radius);
            padding: 5px;
            margin-left: 10px;

            p {
                padding: 0 5px;
                margin-bottom: 1px;
            }
        }

        button {
            border: none;
            display: inherit;
            justify-content: inherit;
            align-items: inherit;
            height: 26px;
            aspect-ratio: 1;
            border-radius: calc(var(--pill-border-radius) - 4px);
            background-color: #454545;
            margin-left: 3px;

            svg { color: var(--offwhite-color) }

            &:hover {
                background-color: #595959;
                cursor: pointer;
            }

            &:active {
                transform: scale(0.95);
            }
        }
    }
</style>
