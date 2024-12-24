<script lang="ts">
	import type { PageData } from "./$types";
	import ArticleHeader from "$lib/components/blog/ArticleHeader.svelte";
	import ReadingTime from "$lib/components/blog/ReadTimeSpacer.svelte";
	import "$lib/styles/markdown.scss";
	import "@fontsource/mononoki";

	import { page } from "$app/stores";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta name="title" property="og:title" content={data.meta.title} />
	<meta name="description" property="og:description" content={data.meta.description} />
	<meta name="author" content="Yonei" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={"https://yonei.dev" + $page.url.pathname + $page.url.search} />
	<meta property="og:site_name" content="Yonei's Blog" />
	<meta property="article:author" content="https://yonei.dev">
	<meta property="article:published_time" content={data.meta.date} />

	{#if data.meta.tags}
		{#each data.meta.tags as tag}
			<meta property="article:tag" content={tag}>
		{/each}
	{/if}

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@y0nei" />
	<meta name="twitter:creator" content="@y0nei" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
</svelte:head>

<article >
	<ArticleHeader meta={data.meta} collection={data.collection} />
	<ReadingTime time={data.meta.readingTime.text} />

	<div class="content">
		{@html data.content}
	</div>
</article>

<style lang="scss">
	article {
		color: var(--clr-offwhite);
		margin-bottom: 1rem;
	}
</style>
