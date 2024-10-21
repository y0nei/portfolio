<script lang="ts">
    import HeroHeader from "$lib/components/HeroHeader.svelte";
    import HeroSocials from "$lib/components/HeroSocials.svelte";
</script>

<div class="hero-header-wrapper">
    <HeroHeader />
    <HeroSocials />
</div>

<style lang="scss">
    .hero-header-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
        flex: 0;
    }

    @media only screen and (max-width: 500px) {
        .hero-header-wrapper {
            gap: 1.25rem;
        }
    }
</style>
