import { escapeSvelte } from "mdsvex";
import { getSingletonHighlighter } from "shiki";
import {
	transformerNotationHighlight,
	transformerNotationWordHighlight,
	transformerNotationFocus,
	transformerNotationDiff
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
		highlighter: async (code, lang) => {
			const highlighter = await getSingletonHighlighter({
				themes: ["github-dark"],
				langs: [lang]
			});
			const html = escapeSvelte(highlighter.codeToHtml(code, {
                lang: lang,
                theme: "github-dark",
				transformers: [
					// BUG: Shiki somehow wont apply meta transformers since meta
					// string parsing doesn't work, only notation transformers work(?)
					transformerNotationHighlight(),
					transformerNotationWordHighlight(),
					transformerNotationFocus(),
					transformerNotationDiff()
				]
            }));
			return `{@html \`${html}\` }`;
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
