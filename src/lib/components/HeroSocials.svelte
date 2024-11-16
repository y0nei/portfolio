<script lang="ts">
import Icon from "$lib/components/IconLoader.svelte";
import Popover from "$lib/components/Popover.svelte";

import userdata from "$lib/user.yml";

let iconmap = new Map<string, string>(Object.entries(userdata.socials))

const iconColors: {[key: string]: string} = {
    bluesky: "#0285FF",
    twitter: "#000000",
    mastodon: "#6364FF",
    telegram: "#26A5E4",
    "ko-fi": "#FF5E5B",
    liberapay: "#F6C915",
    instagram: "#E4405F",
    codeberg: "#2185D0",
    github: "#181717",
    gitlab: "#FC6D26"
}
</script>

<div class="socialsContainer">
    {#each iconmap as [name, link]}
    <div style="--hover-color: {iconColors[name.toLocaleLowerCase()]};"
         class="icon-{name.toLowerCase()}"
    >
        <a href={link} target="_blank">
            <Icon name={name.toLocaleLowerCase()} size={30} />
            <Popover class="show-tooltip">{name}</Popover>
        </a>
    </div>
    {/each}
</div>

<style lang="scss" global>
    .socialsContainer {
        --icon-size: 50px;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        font-family: sans-serif;
        width: fit-content;

        svg { fill: black }

        .info-icon {
            position: absolute;
            right: -10%;
            top: -10%;

            &:hover {
                background-color: lightgreen;  // temporary

                .popover-tooltip {
                    opacity: 1;
                    visibility: visible;
                    // Delay for opacity just on hover for a suttle effect
                    transition-delay: 400ms;
                    transition-property: opacity;
                }
            }
        }

        & > div {
            position: relative;
            display: flex;
            width: var(--icon-size);
            align-items: center;
            aspect-ratio: 1;

            & > a {
                display: flex;
                justify-content: center;  // For tooltips
                padding: 10px;
                transition: 150ms;
                background: white;
                border-radius: var(--border-radius);
                background-color: var(--offwhite-color);
                white-space: nowrap;

                &:hover {
                    background-color: var(--hover-color);

                    .show-tooltip {
                        opacity: 1;
                        visibility: visible;
                        // Delay for opacity just on hover for a suttle effect
                        transition-delay: 400ms;
                        transition-property: opacity;
                    }
                }
            }
        }

        // For better contrast between hover-color and text color
        .icon-bluesky, .icon-mastodon, .icon-telegram, .icon-instagram {
            .popover-tooltip { color: #000 }
        }
        .icon-twitter {
            &:hover svg { fill: white }
        }

        // Overrides for PopoverTooltip content
        .iceshrimp-tooltip {
            --link-color: #A8D3F9;
            --link-hover-color: #85C7E8;
            bottom: 160%;
            padding: 5px;
            min-width: 150px;
            font-size: 0.85rem;
            color: var(--background-color);

            & > p a {
                color: #064e79;
                text-decoration: underline;
                cursor: pointer;
            }

            .info-tooltip-button {
                display: flex;
                justify-content: center;
                text-decoration: none;
                margin-top: 5px;
                padding: 3px 0;
                background-color: rgba(0,0,0,0.3);
                border-radius: 5px;
                color: var(--link-color);

                &:hover {
                    background-color: rgba(0,0,0,0.4);
                    color: var(--link-hover-color);
                    cursor: pointer;

                    svg {
                        color: var(--link-hover-color);
                    }
                }

                svg {
                    color: var(--link-color);
                    margin-top: 2px;
                }
            }
        }

        @media screen and (max-width: 600px) {
            --icon-size: 40px;

            .info-icon {
                width: 1.15rem;
                height: 1.15rem;
                right: -12%;
                top: -12%;
            }

            a div.svg-container {
                width: 25px !important;
                height: 25px !important;
            }

            & > div > a {
                padding: 8px;
                border-radius: calc(var(--border-radius) / 1.25);
            }
        }
    }
</style>
