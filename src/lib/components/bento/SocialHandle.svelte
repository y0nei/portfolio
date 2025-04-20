<script lang="ts">
    import "@fontsource/mononoki";
    import { copy } from "svelte-copy";
    import Icon from "$lib/components/Icon.svelte";

    let copynotif: HTMLElement;
    function copiedAnimation() {
        let randomRotation = Math.floor(Math.random() * (3 - -3 + 1)) - 3;
        copynotif.querySelector(".svg-container:first-of-type")?.animate(
            [ { opacity: 1 }, { opacity: 0 }, { opacity: 0 }, { opacity: 0 } ],
			{ duration: 600, direction: 'alternate', iterations: 2 },
        )
        copynotif.querySelector(".svg-container:last-of-type")?.animate(
            [ { opacity: 0 }, { opacity: 1 }, { opacity: 1 }, { opacity: 1 } ],
			{ duration: 450, direction: 'alternate', iterations: 2, delay: 150 },
        )
        copynotif.getElementsByClassName("copiedtext")[0].animate(
            [
                { transform: `translateY(-1em) rotate(${randomRotation/3}deg)`, opacity: 0 },
                { transform: `translateY(-1.9em) rotate(${randomRotation/2.5}deg)`, opacity: 1 },
                { transform: `translateY(-2.05em) rotate(${randomRotation/2}deg)`, opacity: 1 },
                { transform: `translateY(-2.15em) rotate(${randomRotation/1.25}deg)`, opacity: 1 },
                { transform: `translateY(-2.33em) rotate(${randomRotation}deg`, opacity: 0 }
            ],
			{ duration: 1200 },
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
            <span class="copiedtext" aria-hidden="true">Copied</span>
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

        & > span {
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

            .copiedtext {
                position: absolute;
                left: -50%;
                top: 0;
                right: 0;
                text-transform: uppercase;
                font-family: "Rubik", sans-serif;
                font-weight: 500;
                margin-inline: auto;
                opacity: 0;
                color: var(--clr-offwhite);
            }

            .svg-container {
                position: absolute;

                &:last-of-type {
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
