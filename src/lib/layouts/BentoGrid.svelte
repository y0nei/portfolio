<script lang="ts">
    import BentoItem from "$lib/components/BentoItem.svelte";
</script>

<div class="bento-grid">
    <BentoItem name="handles"/>
    <BentoItem name="badges"/>
    <BentoItem name="webrings"/>
    <BentoItem name="buttons" hollow/>
</div>

<style lang="scss" global>
    .bento-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1rem;
        // Limit width until breakpoint hits for vertical layout
        width: 675px;
    }
</style>
