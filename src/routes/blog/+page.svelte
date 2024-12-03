<script lang="ts">
	import { formatDate } from "$lib/utils/formatDate";
    import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	<title>Yonei's Blog</title>
</svelte:head>

<ul>
	{#each data.posts as post}
		{@const collectionQuery = post.collection ? "?collection=" + post.collection : undefined}
		<li>
			<a href="blog/{post.slug}{collectionQuery}">
				{post.title}
			</a>
			<p class="date">{formatDate(post.date, "short")}</p>
			<!-- TODO: Add filtering option for tags -->
			{#if post.tags}
				{#each post.tags as tag}
					<span>&num;{tag}</span>
				{/each}
			{/if}
			{#if post.description}
				<p>{post.description}</p>
			{/if}
		</li>
	{/each}
</ul>
