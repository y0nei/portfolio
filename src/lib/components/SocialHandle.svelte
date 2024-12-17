<script lang="ts">
    import "@fontsource/mononoki";
    import { copy } from "svelte-copy";
    import Icon from "$lib/components/IconLoader.svelte";

    interface Props {
        platform: string,
        value: string,
        iconSize: number,
    }

    let { platform, value, iconSize = 30 }: Props = $props();
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
        --clr-pill-background: #242424;
        --clr-pill-border: #58585e;
        --clr-pill-button: #454549;
        --pill-border-radius: 0.6rem;

        display: flex;
        align-items: center;
        color: var(--clr-text);
        font-family: "Mononoki", monospace;
        font-size: 1rem;

        span {
            display: inherit;
            align-items: inherit;
            justify-content: center;
            background-color: var(--clr-pill-background);
            border: 1px dashed var(--clr-pill-border);
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
            background-color: var(--clr-pill-button);
            margin-left: 3px;

            svg { color: var(--clr-offwhite) }

            &:hover {
                background-color: var(--clr-pill-border);
                cursor: pointer;
            }

            &:active {
                transform: scale(0.95);
            }
        }
    }
</style>
