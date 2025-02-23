<script lang="ts">
    import { page } from "$app/stores";

    interface Props {
        name: string,
        size?: number,
    }

    let { name, size = 28 }: Props = $props();
</script>

<div style:width={size+"px"} class="svg-container">
    {@html $page.data.iconMap.get(name)}
</div>

<style lang="scss">
    .svg-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
