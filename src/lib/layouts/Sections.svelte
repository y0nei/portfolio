<div class="section-wrapper">
    <slot />
</div>

<style lang="scss" global>
    .section-wrapper {
        scroll-behavior: smooth;
        // NOTE: Causes additional scrollbars on chromium for no reason
        // overflow-y: scroll;

        section {
            height: 100vh;
            height: 100dvh;  // Use dynamic viewport height if supported
            width: 100vw;

            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
    }

    section#home {
        background-color: var(--background-color);

        .home-wrapper {
            display: flex;
            justify-content: space-between;
            margin: 0 5rem;
            gap: 5rem;
        }

        @media only screen and (max-width: 1450px) {
            .home-wrapper {
                flex-direction: column;
                justify-content: center;
                margin: 0 4rem;
                gap: 4rem;
                flex: 0;
            }
        }
        @media only screen and (max-width: 600px) {
            .home-wrapper {
                gap: 2.5rem;
            }
        }
    }
</style>
