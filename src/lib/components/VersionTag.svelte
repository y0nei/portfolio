<script lang="ts">
    let { hash }: { hash: string } = $props();
</script> 

<span>
    version:
    <a href={"https://github.com/y0nei/portfolio/commit/" + hash} target="_blank">
        {hash}
    </a>
</span>

<style lang="scss">
    span {
        position: absolute;
        bottom: 0;
        right: 0;
        color: var(--clr-offwhite);
        font-family: sans-serif;
        font-size: 0.72rem;
        background-color: #323235;
        border: 1px solid #454549;
        padding: 2px 6px;

        border-top-left-radius: calc( var(--border-radius) / 2);

        a {
            text-decoration: none;
            color: var(--clr-secondary);

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
