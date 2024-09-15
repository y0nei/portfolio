<script lang="ts">
    import BentoItem from "$lib/components/BentoItem.svelte";
    import Handles from "$lib/layouts/Handles.svelte";
    import WebBadges from "$lib/layouts/WebBadges.svelte";
</script>

<div class="bento-grid">
    <BentoItem name="handles">
        <Handles />
    </BentoItem>
    <BentoItem name="badges">
        <WebBadges />
    </BentoItem>
    <BentoItem name="webrings"/>
    <BentoItem name="buttons" hollow/>
</div>

<style lang="scss" global>
    .bento-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1rem;
        width: 100%;
    }
</style>
