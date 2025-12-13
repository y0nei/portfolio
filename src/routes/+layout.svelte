<script lang="ts">
    import "minireset.css";
    import "$lib/styles/variables.scss";

    import type { Snippet } from "svelte";
	import type { PageData } from './$types';

	let { children, data }: { children: Snippet, data: PageData } = $props();
</script>

<svelte:head>
    {@html data.analyticsURL}
</svelte:head>

{@render children()}

