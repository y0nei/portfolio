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
        {#snippet header()}
            <p>Web Badges</p>
            <InfoIcon>
                <Popover collapsible={{title: "Submissions & Content"}}>
                    Fun retro web badges found around the internet, along with badges
                    of cool people and friends of mine. <br>
                    {#snippet collapse()}
                        Please contact me if you'd like
                        your badge added, if any of those people are secretly awful
                        or the websites contain hateful content.
                    {/snippet}
                </Popover>
            </InfoIcon>
        {/snippet}
        {#snippet additional()}
            <GetMyBadge />
        {/snippet}
        <BadgeMarquee />
    </BentoItem>
    <BentoItem name="webrings">
        {#snippet header()}
            <p>Webrings</p>
        {/snippet}
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
        flex: 0;
    }

    .webring-wrapper {
        display: flex;
        justify-content: space-evenly;
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
            gap: 0.33rem;
        }
        &-badges .info-icon {
            --clr-hover: var(--clr-secondary);
            width: .85rem;
            height: .85rem;
            padding: 3px;

            .popover-tooltip {
                width: 200px;
                font-size: 0.85rem;
                bottom: 160%;
                padding: 5px;
                color: var(--clr-background);
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
                color: var(--clr-background);
                background-color: var(--clr-accent);
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

    // For bigger buttons
    @media screen and (max-width: 1450px) {
        .bento-grid {
            grid-template-rows: unset;
            grid-auto-rows: minmax(6.5rem, auto);
        }
    }

    @media only screen and (max-width: 750px) {
        .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 1fr);
            width: initial;

            .bento-item.section {
                &-handles {
                    grid-column: 1;
                    grid-row: 1 / span 2;

                    .social-handle span {
                        width: 100%;

                        p {
                            width: 100%;
                            text-align: center;
                        }
                    }
                }
                &-buttons {
                    order: 1;
                    grid-column: 2;
                    grid-row: 1;
                }
                &-webrings {
                    order: 2;
                    grid-column: 2;
                    grid-row: 2;
                }
                &-badges {
                    grid-column: 1 / span 2;
                    grid-row: 3;
                }
            }
        }
    }
    @media only screen and (max-width: 580px) {
        .bento-grid .bento-item.section {
            &-webrings {
                order: 2;
                grid-column: 1 / span 2;
                grid-row: 3;
            }
            &-badges {
                grid-column: 2;
                grid-row: 2;
            }
        }

        .get-mine-modal .modal-btn{
            padding: 5px;

            p {
                display: none;
            }
        }
    }
    @media only screen and (max-width: 500px) {
        .bento-grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
            // grid-template-columns: repeat(2, 1fr);
            
            // For bigger buttons
            grid-template-rows: unset;
            grid-auto-rows: minmax(6.5rem, auto);

            .bento-item.section {
                &-handles {
                    grid-column: 1 / span 2;
                    grid-row: 1;
                }
                &-webrings {
                    grid-column: 1 / span 2;
                    grid-row: 2;
                }
                &-badges {
                    grid-column: 1;
                    grid-row: 3;
                }
                &-buttons {
                    flex-direction: column;
                    grid-column: 2;
                    grid-row: 3;
                }
            }
        }
    }
</style>
