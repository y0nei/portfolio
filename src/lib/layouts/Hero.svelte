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
    }

    @media only screen and (max-width: 1337px) {
        .hero-header-wrapper {
            width: 100%;
        }
    }
</style>
