<a {...$$restProps}><slot /></a>

<style lang="scss">
    a {
        font-family: "Rubik";
        color: var(--text-color);

        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        padding: 7px 12px;
        border-radius: var(--border-radius);
        background-color: var(--background-color-alt);
        width: 100%;
        text-decoration: none;
        color: var(--text-color);
        cursor: pointer;

        &:hover {
            filter: brightness(1.15);
        }
    }
</style>
