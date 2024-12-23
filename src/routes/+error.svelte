<script lang="ts">
	import { page } from "$app/stores";
</script>

<div>
    <h1>{$page.status}</h1>
    <p>{$page.error!.message}</p>
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        width: 100dvw;
        height: 100dvh;
        background-color: var(--clr-background);

        h1 {
            font-family: "Rubik", sans-serif;
            font-size: 7rem;
            font-weight: bold;
            color: var(--clr-background-alt);
        }

        p {
            font-family: "Rubik", sans-serif;
            font-size: 1.33rem;
            color: var(--clr-offwhite);
            opacity: 0.75;
        }
    }
</style>
