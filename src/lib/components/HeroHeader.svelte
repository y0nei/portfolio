<header>
    <h1>Hi there, I'm <b>Yonei</b>!</h1>
    <p class="description">
        I like coding things, art, tinkering with systems, learning random stuff
        & being silly on the internet.<br>
        Working in B2B Sales and breaking websites in my free time.
    </p>
</header>

<style lang="scss">
    header {
        color: var(--text-color);
        font-family: "Rubik", sans-serif;
        // font-size: clamp(2.4rem, 6vw + 1rem, 5rem);
        font-size: clamp(2.2rem, 10vw, 4.5rem);
        flex-direction: column;

        h1 {
            width: fit-content;
            white-space: nowrap;
        }
        h1 b {
            color: var(--accent-color);
            font-weight: 900;

            background: linear-gradient(
                -135deg,
                var(--text-color) 0%,
                var(--text-color) 45%,
                #424242 49%,
                #424242 50%,
                var(--accent-color) 50%,
                var(--accent-color) 100%
            );
            background-size: 250% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .description {
            opacity: 0.75;
            max-width: 47ch;
            line-height: 1.15;
            font-style: italic;
            /* TODO: Fix margin-top scale on small displays */
            font-size: clamp(0.78rem, 3vw, 1.33rem);
        }
    }

    @media only screen and (max-width: 500px) {
        header {
            // font-size: clamp(2.2rem, 9.8vw, 4rem);

            .description {
                font-size: clamp(0.9rem, 3vw, 1.2rem);
            }
        }
    }
</style>
