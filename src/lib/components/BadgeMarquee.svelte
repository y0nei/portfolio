<script lang="ts">
    import socials from "$lib/user.yml";

    const badge_path = "badges/";
</script>

<div class="marquee-wrapper">
    <slot />
    <div class="badge-marquee">
        <ul>
            {#each socials.web_badges as item}
                <li>
                    <a href={item.src} target="_blank">
                        <img src={item.path.startsWith("http") ? item.path : badge_path + item.path}
                            alt={item.name} />
                    </a>
                </li>
            {/each}
        </ul>
        <!-- Mirror of the content above -->
        <ul aria-hidden="true">
            {#each socials.web_badges as item}
                <li>
                    <a href={item.src} target="_blank">
                        <img src={item.path.startsWith("http") ? item.path : badge_path + item.path}
                            alt={item.name} />
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style lang="scss" global>
    $badge-height: 31px;
    $badge-width: 88px;

    /* NOTE: Used to properly flex with position absolute of it's child */
    .marquee-wrapper {
        display: flex;
        position: relative;
        overflow: hidden;
        height: $badge-height;
        flex: 1;
        align-items: center;
        margin-bottom: 5px;

        /* Edge fade-out's */
        --mask: linear-gradient(to right,
            rgba(0,0,0,0) 0%,
            rgba(0,0,0,1) 8%,
            rgba(0,0,0,1) 92%,
            rgba(0,0,0,0) 100%
        );
        -webkit-mask: var(--mask);
        mask: var(--mask);
    }

    .badge-marquee {
        --badge-spacing: 10px;

        position: absolute;
        display: flex;
        user-select: none;

        ul {
            display: flex;
            align-items: center;
            justify-content: space-around;
            animation: scroll 20s linear infinite;

            li {
                display: flex;
                /* NOTE: Pixel padding bcuz flex gap doesnt work correctly */
                margin-left: var(--badge-spacing);

                a {
                    width: $badge-width;
                    height: $badge-height;

                    &:hover {
                        cursor: pointer;
                        filter: brightness(1.15);
                    }
                }
            }
        }
    }

    @keyframes scroll {
        from { transform: translateX(var(--badge-spacing)) }
        to { transform: translateX(calc(-100% + var(--badge-spacing))) }
    }
</style>
