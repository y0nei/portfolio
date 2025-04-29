<script lang="ts">
    import type { Post } from "$lib/types";
	import { formatDate } from "$lib/utils/formatDate";

    interface Props {
        post: Post,
        collection?: {
            name?: string,
            query?: string
        }
    }

    let { post, collection }: Props = $props();
</script>

<li>
	{#if post.coverImage}
		<div class="cover-image">
			<img src={"data:image/png;base64," + post.coverImage}
				 alt={post.coverImageAlt} />
		</div>
	{/if}
	<div class="post-card-content">
		<header>
			<a href="blog/{post.slug}{collection?.query}">
				{post.title}
			</a>
		</header>
		<div>
			<p class="date">{formatDate(post.date, "short")}</p>
			{#if post.collection}
				<span>
					collection:&nbsp;
					<p class="collection">{collection?.name}</p>
				</span>
			{/if}
		</div>
		{#if post.description}
			<p class="description">{post.description}</p>
		{/if}
		<!-- TODO: Add filtering option for tags -->
		{#if post.tags}
			<ul class="tags">
				{#each post.tags as tag}
					<li>&num;{tag}</li>
				{/each}
			</ul>
		{/if}
	</div>
</li>

<style lang="scss">
	li {
		color: var(--clr-offwhite);
		background-color: var(--clr-blog-card);
		border: 1px solid var(--clr-bento-background);
        border-radius: var(--border-radius);

		display: flex;
		overflow: hidden;
		font-family: "Atkinson Hyperlegible", sans-serif;
		margin-bottom: 1.5rem;
		max-width: 45rem;
		width: 100%;

		&:last-child {
			margin-bottom: 0;
		}

		.cover-image {
			display: flex;
			position: relative;
			min-height: 100%;
			max-width: 15rem;
			flex-grow: 1;
			mask-image: linear-gradient(
				96deg,
				rgba(0,0,0,1),
				rgba(0,0,0,1),
				rgba(0,0,0,1),
				rgba(0,0,0,0.9),
				rgba(0,0,0,0.5),
				rgba(0,0,0,0.05),
				rgba(0,0,0,0)
			);

			img {
				position: absolute;
				object-fit: cover;
				width: 100%;
				height: 100%;
			}

			& + .post-card-content {
				margin-left: 0;
			}
		}

		.post-card-content {
			margin: 1rem;

			header {
				font-size: 2.75rem;
				font-family: "Rubik", sans-serif;

				a {
					text-decoration: none;
					color: var(--clr-offwhite);

					&:hover {
						color: var(--clr-accent);
					}
				}
			}

			& > div {
				--_gap: 0.25rem;

				display: flex;
				justify-items: center;
				gap: var(--_gap);
				font-size: 0.8rem;
				color: gray;
				margin-bottom: 0.5rem;

				span {
					display: inline-flex;
					align-items: center;
					padding-left: var(--_gap);

					.collection {
						color: var(--clr-accent);
					}

					&::before {
						content: " ";
						background-color: gray;
						width: 0.25rem;
						height: 0.25rem;
						border-radius: 100%;
						margin-right: calc(0.25rem + var(--_gap));
					}
				}
			}

			.description {
				margin-top: 0.75rem;
			}

			ul.tags {
				display: flex;
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

		@media only screen and (max-width: 580px) {
			.cover-image {
				display: none;

				& + .post-card-content {
					margin-left: 1rem;
				}
			}
		}
	}
</style>
