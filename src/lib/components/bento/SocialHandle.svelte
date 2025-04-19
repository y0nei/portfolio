<script lang="ts">
    import "@fontsource/mononoki";
    import { copy } from "svelte-copy";
    import Icon from "$lib/components/Icon.svelte";

    let copynotif: HTMLElement;
    function copiedAnimation() {
        copynotif.querySelector(".svg-container:first-child")?.animate(
            [ { opacity: 1 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 } ],
			{ duration: 600, direction: 'alternate', iterations: 2 },
        )
        copynotif.querySelector(".svg-container:last-child")?.animate(
            [ { opacity: 0 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 } ],
			{ duration: 450, direction: 'alternate', iterations: 2, delay: 150 },
        )
    }

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
        <button bind:this={copynotif} use:copy={value} onclick={copiedAnimation}>
            <Icon name="copy" size={16} />
            <Icon name="check" size={20} />
        </button>
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
            position: relative;
            justify-content: inherit;
            align-items: inherit;
            height: 26px;
            aspect-ratio: 1;
            border-radius: calc(var(--pill-border-radius) - 4px);
            background-color: var(--clr-pill-button);
            margin-left: 3px;

            .svg-container {
                position: absolute;

                &:last-child {
                    opacity: 0;

                    svg { color: var(--clr-accent) };
                }
            }

            svg { color: var(--clr-offwhite) };

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
