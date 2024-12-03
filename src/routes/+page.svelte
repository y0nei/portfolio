<script lang="ts">
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
