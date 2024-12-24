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
</li>

<style lang="scss">
	li {
		color: var(--clr-offwhite);
		font-family: "Atkinson Hyperlegible", sans-serif;

		// Separator
		border-bottom: 1px dashed var(--clr-background-alt);
		padding-bottom: 2.5rem;
		margin-bottom: 2rem;

		&:last-child {
			border-bottom: none;
			margin-bottom: 0;
			padding-bottom: 0;
		}

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
</style>
