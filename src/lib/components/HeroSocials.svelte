<script lang="ts">
    import Icon from "$lib/components/IconLoader.svelte";
    import Popover from "$lib/components/Popover.svelte";
    import userdata from "$lib/user.yml";

    let iconmap = new Map(Object.entries(userdata.socials))

    const iconColors: Record<string, string> = {
        bluesky: "#0285FF",
        twitter: "#000000",
        mastodon: "#6364FF",
        telegram: "#26A5E4",
        "ko-fi": "#FF5E5B",
        liberapay: "#F6C915",
        instagram: "#E4405F",
        codeberg: "#2185D0",
        github: "#364049",  // Darker tone: #2e363e
        gitlab: "#FC6D26"
    }
</script>

<div class="socialsContainer">
    {#each iconmap as [name, link]}
        <div style="--clr-hover: {iconColors[name.toLocaleLowerCase()]};"
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
                background-color: var(--clr-offwhite);
                white-space: nowrap;

                &:hover {
                    background-color: var(--clr-hover);

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
        .icon {
            &-bluesky, &-mastodon, &-telegram {
                .popover-tooltip { color: #000 }
            }
            &-twitter, &-github {
                &:hover svg { fill: white }
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
