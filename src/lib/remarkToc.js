import { toc } from "mdast-util-toc";

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-toc').Options} Options
 */

/**
 * Generate a table of contents (TOC).
 *
 * Looks for the first heading matching `options.heading` (case insensitive),
 * removes everything until the next paragraph, and inserts a list representing
 * the rest of the document structure, linking to all further headings.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
const remarkToc = (options = {}) => {
    /**
     * Transform.
     *
     * @param {Root} tree
     *   Tree.
     * @returns {undefined}
     *   Nothing.
     */
    return (tree) => {
        const result = toc(tree, {
            ...options,
            heading: (options && options.heading) || '(table[ -]of[ -])?contents?|toc',
            tight: options && typeof options.tight === 'boolean' ? options.tight : true
        });

        if (
            result.endIndex === undefined ||
            result.endIndex === -1 ||
            result.index === undefined ||
            result.index === -1 ||
            !result.map
        ) {
            return
        };

        if ("children" in tree) {
            tree.children = [
                ...tree.children.slice(0, result.index),
                result.map,
                // NOTE: Changed result.endIndex to just result.index to not remove
                // leading elements with no headers.
                ...tree.children.slice(result.index)
            ];
        };
    };
};

export default remarkToc;
