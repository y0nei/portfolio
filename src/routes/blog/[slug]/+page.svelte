<script lang="ts">
	import { formatDate } from "$lib/utils/formatDate";
	import type { PageData } from "./$types";
	import Icon from "$lib/components/IconLoader.svelte";
	import "$lib/styles/markdown.scss";
	import "@fontsource/mononoki";
	import "@fontsource/atkinson-hyperlegible";
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

<article class="markdown-article">
	<hgroup>
		<h1>{data.meta.title}</h1>
		<div>
			<div class="date">
				<Icon name="calendar" size={18} />
				<p>Published on {formatDate(data.meta.date)}</p>
			</div>
			{#if data.collection}
				<p class="collection">Part of <span>{data.collection}</span> collection</p>
			{/if}
		</div>
		{#if data.meta.description}
			<p class="description">{data.meta.description}</p>
		{/if}
	</hgroup>

	{#if data.meta.tags}
		<ul class="tags">
			{#each data.meta.tags as tag}
				<li>&num;{tag}</li>
			{/each}
		</ul>
	{/if}

	<div class="spacer">
		<span>{data.meta.readingTime.text}</span>
	</div>

	<div class="content">
		{@html data.content}
	</div>
</article>

<style lang="scss" global>
	article.markdown-article {
		color: var(--clr-offwhite);
		font-family: "Atkinson Hyperlegible", sans-serif;

		hgroup {
			h1 {
				font-family: "Rubik", sans-serif;
				font-size: 3rem;
			}

			.description {
				font-size: 1.1rem;
				margin-top: 1rem;
			}

			& > div {
				display: flex;
				align-items: center;
				gap: 0.75rem;
				width: fit-content;

				.date {
					display: flex;
					align-items: center;
					gap: 0.25rem;

					p {
						font-size: 1rem;
						color: gray;
					}

					:global(.svg-container) {
						margin-bottom: 2px;

						:global(svg) {
							fill: #808080;
						}
					}
				}

				.collection {
					background-color: var(--clr-accent-dark);
					width: fit-content;
					padding: 4px 8px;
					font-size: 0.78rem;
					border-radius: 10rem;

					span {
						color: var(--clr-accent);
					}
				}
			}
		}

		ul.tags {
			display: flex;
			flex-wrap: wrap;
			gap: 0.25rem;
			margin-top: 0.5rem;

			li {
				background-color: var(--clr-background-alt);
				width: fit-content;
				padding: 4px 6px;
				font-size: 0.9rem;
				border-radius: calc(var(--border-radius) / 1.5);
			}
		}

		.spacer {
			display: flex;
			position: relative;
			justify-content: center;
			user-select: none;
			margin-top: 2rem;
			margin-bottom: 3rem;

			&::before {
				content: "";
				position: absolute;
				bottom: -2px;
				width: 100%;
				height: 1px;
				background: linear-gradient(
					to right,
					transparent 0%,
					var(--clr-bento-border) 15%,
					var(--clr-bento-border) 95%,
					transparent 100%
				);
			}

			span {
				position: absolute;
				top: -0.5rem;
				font-family: "Mononoki", monospace;
				font-size: 0.75rem;
				padding: 0.1rem 0.3rem;
				border: 1px solid var(--clr-bento-border);
				background-color: var(--clr-background-alt);
				border-radius: calc(var(--border-radius) / 2);
			}
		}

		@media only screen and (max-width: 500px) {
			hgroup {
				h1 {
					font-size: 2.7rem;
				}

				& > div {
					flex-direction: column;
					align-items: initial;
					gap: 0.5rem;
				}
			}
		}
	}
</style>
