import { escapeSvelte } from "mdsvex";
import { getSingletonHighlighter } from "shiki";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkToc from "$lib/remarkToc";
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
                theme: "github-dark"
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
