<script lang="ts">
    interface Props {
        name: string,
        href: {
            previous: string,
            random: string,
            next: string
        }
    };

    let { name, href }: Props = $props();
</script>

<div>
    <p>{name}</p>
    <span>
        <a class="webring-previous" href={href.previous}>&laquo;</a>
        <a class="webring-random" href={href.random}>Random</a>
        <a class="webring-next" href={href.next}>&raquo;</a>
    </span>
</div>

<style lang="scss">
    div {
        background-color: var(--clr-bento-border);
        border-radius: calc(var(--border-radius) - 5px);
        padding: 5px;
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        height: fit-content;
        width: fit-content;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);

        span {
            display: flex;
            justify-content: center;

            a {
                padding: 2px 5px;
                background-color: #6b6b72;
                user-select: none;
                transition: 150ms;
                text-decoration: none;
                color: var(--clr-offwhite);

                &:hover {
                    background-color: var(--clr-secondary);
                    cursor: pointer;
                    color: var(--clr-background);
                }

                &:first-child {
                    border-right: 2px solid var(--clr-bento-border);
                    border-top-left-radius: calc(var(--border-radius) - 7px);
                    border-bottom-left-radius: calc(var(--border-radius) - 7px);
                }
                &:last-child {
                    border-left: 2px solid var(--clr-bento-border);
                    border-top-right-radius: calc(var(--border-radius) - 7px);
                    border-bottom-right-radius: calc(var(--border-radius) - 7px);
                }
            }
        }
    }
</style>
