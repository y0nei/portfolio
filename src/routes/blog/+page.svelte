<script lang="ts">
	import type { PageData } from "./$types";
    import Post from "$lib/components/blog/PostListEntry.svelte";

	let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	<title>Yonei's Blog</title>
</svelte:head>

<ul>
	{#each data.posts as post}
		{@const collectionName = post.collection?.replace(/^\[+|\]+$/g, '')}

		<Post post={post} collection={collectionName} />
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
</style>
