<script lang="ts">
import Icon from "$lib/components/IconLoader.svelte";
</script>

<span class="info-icon {$$props.class || ''}">
    <Icon name="question-mark" />
    <slot />
</span>

<style lang="scss">
    .info-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 1.2rem;
        height: 1.2rem;
        padding: 5px;
        border-radius: 100%;
        color: var(--clr-background);
        background-color: var(--clr-offwhite);
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        user-select: none;

        b { font-size: 0.75rem }
    }
</style>
