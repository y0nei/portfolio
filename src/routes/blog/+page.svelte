<script lang="ts">
    import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	<title>Yonei's Blog</title>
</svelte:head>

<ul>
	{#each data.posts as post}
		<li>
			<a href="blog/{post.slug}">{post.title}</a>
			<p class="date">{post.date}</p>
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
