<a {...$$restProps}><slot /></a>

<style lang="scss">
    a {
        font-family: "Rubik";
        color: var(--clr-text);

        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        padding: 7px 12px;
        border-radius: var(--border-radius);
        background-color: var(--clr-background-alt);
        width: 100%;
        text-decoration: none;
        color: var(--clr-text);
        cursor: pointer;

        &:hover {
            filter: brightness(1.15);
        }
    }
</style>
