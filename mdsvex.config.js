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
			return `{@html \`<div class="shiki-block" data-lang="${lang}">
				${withTitle ? `<h1 class="shiki-block-title">${withTitle[1]}</h1>` : ''}
				${html}
			</div>\` }`;
		}
	},
	remarkPlugins: [
        [remarkToc, { tight: true, maxDepth: 3 }],
        remarkSubSuper,
        remarkIns,
        remarkFootnotes
    ],
	rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeUnwrapImages
    ]
};

export default mdsvexOptions;
