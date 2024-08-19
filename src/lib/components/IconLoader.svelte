<script lang="ts">
    export let name: string;
    export let size: number = 28;

    let iconMap = new Map<string, string>()

    const icons = import.meta.glob(
        "$icons/*.svg",
        { eager: true, query: "?raw", import: "default" }
    )

    for (const obj in icons) {
        const key: string = obj.slice(14, -4);
        iconMap.set(key, icons[obj] as string)
    }
</script>

<div style:width={size+"px"} style:height={size+"px"}>
    {@html iconMap.get(name)}
</div>

<style lang="scss">
    div :global(svg) {
        fill: inherit;
    }
</style>
