<script lang="ts">
    import Icon from "$lib/components/Icon.svelte";
</script>

<div class="under-construction-flex">
    <div>
        <span>
            <p>website currently under construction.</p>
            &nbsp;
            <a href="https://github.com/y0nei/portfolio" target="_blank">
                contribute&nbsp;
                <Icon name="external-link" size={13}/>
            </a>
        </span>
    </div>
</div>

<style lang="scss">
    div.under-construction-flex {
        width: 100%;
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;

        div {
            display: flex;
            border-radius: 0 0 var(--border-radius) var(--border-radius);
            border: 1px var(--clr-background-alt) solid;
            border-top: none;
            padding: 0 2px 2px 2px;
            background: repeating-linear-gradient(
              -45deg,
              #f2a417,
              #f2a417 15px,
              #141617 15px,
              #141617 30px
            );
            animation: scrolling-gradient 1s linear infinite;
            background-size: 40px 40px;

            span {
                color: white;
                display: flex;
                font-family: sans-serif;
                font-size: 0.8rem;
                border-radius: inherit;
                background-color: var(--clr-background-alt);
                padding: 0 7px;
                padding-bottom: 3px;

                a {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: var(--clr-secondary);
                }
            }
        }
    }

    @keyframes scrolling-gradient {
        0% { background-position: 0 }
        100% { background-position: 40px }
    }

    @media only screen and (max-width: 450px) {
        div.under-construction-flex div span {
            font-size: 0.75rem;
        }
    }
</style>
