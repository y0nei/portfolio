<script lang="ts">
    import BentoItem from "$lib/components/BentoItem.svelte";
    import Handles from "$lib/layouts/Handles.svelte";
    import BadgeMarquee from "$lib/components/BadgeMarquee.svelte";
</script>

<div class="bento-grid">
    <BentoItem name="handles">
        <Handles />
    </BentoItem>
    <BentoItem name="badges">
        <p slot="header">Web Badges</p>
        <BadgeMarquee />
    </BentoItem>
    <BentoItem name="webrings">
        <p slot="header">Webrings</p>
    </BentoItem>
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
