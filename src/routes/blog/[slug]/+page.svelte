<script lang="ts">
	import { formatDate } from "$lib/utils/formatDate";
	import type { PageData } from "./$types";
	import Icon from "$lib/components/IconLoader.svelte";

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		<div>
			<div class="date">
				<Icon name="calendar" size={18} />
				<p>Published on {formatDate(data.meta.date)}</p>
			</div>
			{#if data.collection}
				<p class="collection">Part of <span>{data.collection.replace(/^\[+|\]+$/g, '')}</span> collection</p>
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

	<div class="content">
		<data.content />
	</div>
</article>

<style lang="scss">
	article {
		color: var(--clr-offwhite);
		// TODO: Find a different font
		font-family: "Rubik";

		hgroup {
			h1 {
				font-size: 3rem;
				margin-bottom: 0.5rem;
			}

			.description {
				margin-top: 0.75rem;
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
					font-size: 0.75rem;
					border-radius: 10rem;

					span {
						color: var(--clr-accent);
					}
				}
			}
		}

		ul.tags {
			display: flex;
			gap: 0.25rem;
			margin-top: 1rem;

			li {
				background-color: var(--clr-background-alt);
				width: fit-content;
				padding: 4px 6px;
				font-size: 0.9rem;
				border-radius: calc(var(--border-radius) / 1.5);
			}
		}

		.content {
			margin-top: 3rem;
		}
	}
</style>
