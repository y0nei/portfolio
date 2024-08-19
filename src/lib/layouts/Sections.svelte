<div class="section-wrapper">
    <slot />
</div>

<style lang="scss" global>
    .section-wrapper {
        scroll-behavior: smooth;
        overflow-y: scroll;

        section {
            height: 100vh;
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
            justify-content: space-evenly;
            width: 100%;
            margin: 0 2rem;
            gap: 5rem;
        }
    }
</style>
