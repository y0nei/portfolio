import { toc } from "mdast-util-toc";
import type { Options } from "mdast-util-toc";
import type { Root, Node } from "mdast";
import type { Plugin } from "unified";

const remarkToc: Plugin<[(Options | undefined)?], Root> = (options = {}) => {
    return (node: Node) => {
        const result = toc(node as Root, {
            ...options,
            heading: (options && options.heading) || "(table[ -]of[ -])?contents?|toc",
            tight: options && typeof options.tight === "boolean" ? options.tight : true
        })

        if (
            result.endIndex === undefined ||
            result.endIndex === -1 ||
            result.index === undefined ||
            result.index === -1 ||
            !result.map
        ) {
            return
        }

        if ("children" in node) {
            node.children = [
                ...(node as Root).children.slice(0, result.index),
                result.map,
                // NOTE: Changed result.endIndex to just result.index to not remove
                // leading elements with no headers.
                ...(node as Root).children.slice(result.index)
            ]
        }
    }
}

export default remarkToc;
