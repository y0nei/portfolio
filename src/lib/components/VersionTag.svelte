<script lang="ts">
import childProcess from "child_process";
const hash = childProcess.execSync("git rev-parse --short HEAD")
                         .toString()
                         .trim();
</script> 

<span>
    version:
    <a href={"https://codeberg.org/y0nei/portfolio/commit/" + hash} target="_blank">
        {hash}
    </a>
</span>

<style lang="scss">
    span {
        position: absolute;
        bottom: 0;
        right: 0;
        color: var(--offwhite-color);
        font-family: sans-serif;
        font-size: 0.72rem;
        background-color: #323235;
        border: 1px solid #454549;
        padding: 2px 6px;

        border-top-left-radius: calc( var(--border-radius) / 2);

        a {
            text-decoration: none;
            color: var(--secondary-color);

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
