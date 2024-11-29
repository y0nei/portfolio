<script lang="ts">
    import "minireset.css";
    import Sections from "$lib/layouts/Sections.svelte";
    import Hero from "$lib/layouts/Hero.svelte";
	import BentoGrid from "$lib/layouts/BentoGrid.svelte";
    import VersionTag from "$lib/components/VersionTag.svelte";
    import UnderConstruction from "$lib/components/UnderConstruction.svelte";

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Yonei</title>
</svelte:head>

<Sections>
	<section id="home">
		<UnderConstruction />
		<VersionTag hash={data.gitCommitHash}/>
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

		--clr-accent: #BBD38B;
        --clr-accent-dark: #30422E;
        --clr-secondary: #8BBBD3;  /* Triadic to accent */

		--clr-offwhite: #F9F4EA;
		--clr-background: #1F1F21;
		--clr-background-alt: #3A393B;

		--clr-text: var(--clr-offwhite);
        --border-radius: 0.75rem;
	}
</style>
