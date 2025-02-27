import { escapeSvelte } from "mdsvex";
import { getSingletonHighlighter } from "shiki";
import {
	transformerNotationFocus,
	transformerNotationDiff,
	transformerMetaHighlight,
	transformerMetaWordHighlight
} from "@shikijs/transformers";

import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkToc from "./src/lib/remarkToc.js";
import remarkSubSuper from "remark-sub-super";
import remarkIns from "remark-ins";
import remarkFootnotes from "remark-footnotes";
import readingTime from "mdsvex-reading-time";

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extension: ".md",
	highlight: {
		highlighter: async (code, lang, metastring) => {
			const withTitle = (metastring || '').match(/title="([^"]+)"/);
			const highlighter = await getSingletonHighlighter({
				themes: ["github-dark"],
				langs: [lang]
			});
			const html = escapeSvelte(highlighter.codeToHtml(code, {
                lang: lang,
                theme: "github-dark",
				transformers: [
					transformerNotationFocus(),
					transformerNotationDiff(),
					transformerMetaHighlight(),
					transformerMetaWordHighlight()
				],
				meta: { __raw: metastring }
            }));
			return `{@html \`<figure class="shiki-block" data-lang="${lang}">
				${withTitle ? `<figcaption class="shiki-block-title">${withTitle[1]}</figcaption>` : ''}
				${html}
			</figure>\` }`;
		}
	},
	remarkPlugins: [
        [remarkToc, { tight: true, maxDepth: 3 }],
        remarkSubSuper,
        remarkIns,
        remarkFootnotes,
		readingTime
    ],
	rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeUnwrapImages
    ]
};

export default mdsvexOptions;
