<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import { formatDate } from "$lib/utils/formatDate";

    interface Props {
        meta : {
            title: string,
            date: Date,
            description?: string,
            tags?: string[],
			coverImageAlt?: string
        },
        collection: Nullable<string>,
		cover?: Base64URLString
    }

    let { meta, collection, cover }: Props = $props();
</script>

<div class="article-header">
	{#if cover}
		<div class="cover-image">
			<img src={"data:image/png;base64," + cover}
				 alt={meta.coverImageAlt} />
		</div>
	{/if}
	<hgroup>
		<h1>{meta.title}</h1>
		<div>
			<div class="date">
				<Icon name="calendar" size={18} />
				<p>Published on {formatDate(meta.date)}</p>
			</div>
			{#if collection}
				<p class="collection">Part of <span>{collection}</span> collection</p>
			{/if}
		</div>
		{#if meta.description}
			<p class="description">{meta.description}</p>
		{/if}
	</hgroup>

	{#if meta.tags}
		<ul class="tags">
			{#each meta.tags as tag}
				<li>&num;{tag}</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss" global>
    .article-header {
		font-family: "Atkinson Hyperlegible", sans-serif;
		position: relative;
		padding: 1rem;

		border: 1px solid var(--clr-bento-background);
        border-radius: var(--border-radius);
		overflow: hidden;

		.cover-image {
			position: absolute;
			object-fit: cover;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			background-color: var(--clr-blog-card);

			img {
				pointer-events: none;
				opacity: 0.5;
				border-radius: var(--border-radius);
				position: absolute;
				object-fit: cover;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;

				mask-image: linear-gradient(
					120deg,
					rgba(0,0,0,0),
					rgba(0,0,0,0.1),
					rgba(0,0,0,1)
				);
			}
		}

		hgroup {
			h1 {
				font-family: "Rubik", sans-serif;
				font-size: 3rem;

				@media only screen and (max-width: 500px) {
					font-size: 2.7rem;
				}
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

					.svg-container {
						margin-bottom: 2px;

						svg {
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

				@media only screen and (max-width: 500px) {
					flex-direction: column;
					align-items: initial;
					gap: 0.5rem;
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
    }
</style>
