<script lang="ts">
    import Icon from "$lib/components/IconLoader.svelte";
    import InfoIcon from "$lib/components/InfoIcon.svelte";
    import Popover from "$lib/components/Popover.svelte";

    import BentoItem from "$lib/components/BentoItem.svelte";
    import Handles from "$lib/layouts/Handles.svelte";
    import BadgeMarquee from "$lib/components/BadgeMarquee.svelte";
    import GetMyBadge from "$lib/components/GetMyBadge.svelte"
    import WebringSelector from "$lib/components/WebringSelector.svelte";
    import BentoButton from "$lib/components/BentoButton.svelte";
</script>

<div class="bento-grid">
    <BentoItem name="handles">
        <Handles />
    </BentoItem>
    <BentoItem name="badges">
        <svelte:fragment slot="header">
            <p>Web Badges</p>
            <InfoIcon>
                <Popover collapsible={{title: "Submissions & Content"}}>
                    Fun retro web badges found around the internet, along with badges
                    of cool people and friends of mine. <br>
                    <svelte:fragment slot="collapsible">
                        Please contact me if you'd like
                        your badge added, if any of those people are secretly awful
                        or the websites contain hateful content.
                    </svelte:fragment>
                </Popover>
            </InfoIcon>
        </svelte:fragment>
        <GetMyBadge slot="additional"/>
        <BadgeMarquee />
    </BentoItem>
    <BentoItem name="webrings">
        <p slot="header">Webrings</p>
        <div class="webring-wrapper">
            <WebringSelector name="CSS Joy" href={{
                previous: "https://webri.ng/webring/cssjoy/previous?via=https://yonei.dev/",
                random: "https://webri.ng/webring/cssjoy/random?via=https://yonei.dev/",
                next: "https://webri.ng/webring/cssjoy/next?via=https://yonei.dev/"
            }}/>
            <WebringSelector name="Fediring" href={{
                previous: "https://fediring.net/previous?yonei.dev",
                random: "https://fediring.net/random",
                next: "https://fediring.net/next?host=yonei.dev"
            }}/>
        </div>
    </BentoItem>
    <BentoItem name="buttons" hollow>
        <BentoButton href="https://status.mossycab.in/status/all" target="_blank">Service status</BentoButton>
        <BentoButton href="#">Blog <Icon name="blog" size={18} /></BentoButton>
    </BentoItem>
</div>

<style lang="scss" global>
    .bento-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1rem;
        width: 100%;
    }

    .webring-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
        margin-top: 0;
        flex: 1;
        gap: 0.5rem;
    }

    .bento-item.section {
        &-handles {
            padding: 5px;
            padding-left: 12px;
            justify-content: space-around;
        }
        &-badges .info-icon {
            --hover-color: var(--secondary-color);
            width: .85rem;
            height: .85rem;
            padding: 3px;

            .popover-tooltip {
                width: 200px;
                font-size: 0.85rem;
                bottom: 160%;
                padding: 5px;
                color: var(--background-color);
            }

            div.svg-container {
                width: 1em !important;
                height: auto !important;
            }

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
        &-buttons {
            display: flex;
            flex-direction: column;
            gap: inherit;
            white-space: nowrap;

            a:last-child {
                gap: 0.33rem;
                color: var(--background-color);
                background-color: var(--accent-color);
            }
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
</style>
