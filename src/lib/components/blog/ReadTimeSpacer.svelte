<script lang="ts">
    interface Props {
        time: string,
    }

    let { time }: Props = $props();
</script>

<div>
    {#if time}
        <span>{time}</span>
    {/if}
</div>

<style lang="scss">
    div {
        display: flex;
        position: relative;
        justify-content: center;
        user-select: none;
        margin-top: 2rem;
        margin-bottom: 3rem;

        &::before {
            content: "";
            position: absolute;
            bottom: -2px;
            width: 100%;
            height: 1px;
            background: linear-gradient(
                to right,
                transparent 0%,
                var(--clr-bento-border) 15%,
                var(--clr-bento-border) 95%,
                transparent 100%
            );
        }

        span {
            position: absolute;
            top: -0.5rem;
            font-family: "Mononoki", monospace;
            font-size: 0.75rem;
            padding: 0.1rem 0.3rem;
            border: 1px solid var(--clr-bento-border);
            background-color: var(--clr-background-alt);
            border-radius: calc(var(--border-radius) / 2);
        }
    }
</style>
