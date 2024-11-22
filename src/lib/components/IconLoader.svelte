<script lang="ts">
    let iconMap = new Map<string, string>()

    const icons = import.meta.glob(
        "$icons/*.svg",
        { eager: true, query: "?raw", import: "default" }
    )

    for (const obj in icons) {
        const key: string = obj.slice(14, -4);
        iconMap.set(key, icons[obj] as string)
    }

    interface Props {
        name: string,
        size?: number
    }

    let { name, size = 28 }: Props = $props();
</script>

<div style:width={size+"px"} class="svg-container">
    {@html iconMap.get(name)}
</div>

<style lang="scss">
    .svg-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
