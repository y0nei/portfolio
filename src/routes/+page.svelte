<script lang="ts">
    import Sections from "$lib/layouts/Sections.svelte";
    import Hero from "$lib/layouts/Hero.svelte";
	import BentoGrid from "$lib/layouts/BentoGrid.svelte";
    import "minireset.css";
</script>

<Sections>
	<section id="home">
		<div class="home-wrapper">
			<Hero />
			<BentoGrid />
		</div>
	</section>
</Sections>

<style lang="scss">
    @font-face {
		font-family: "Rubik";
		src: url("/fonts/Rubik-VariableFont_wght.ttf") format("truetype");
		font-display: swap;
	}

	:root {
        /* Other cool colors: #233531 #F3EEE8 */

		--accent-color: #BBD38B;
        --accent-color-dark: #30422E;
        --secondary-color: #8BBBD3;  /* Triadic to accent */

		--offwhite-color: #F9F4EA;
		--background-color: #1F1F21;
		--background-color-alt: #3A393B;

		--text-color: var(--offwhite-color);
        --border-radius: 0.75rem;
	}
</style>
