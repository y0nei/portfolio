import type { RequestHandler } from "./$types";
import { searchForWorkspaceRoot } from "vite";
import path from "path";

async function getImage(fileName: string) {
    const imports = import.meta.glob([
        "$posts/**/*.png",
        "$posts/**/*.jpg",
        "$posts/**/*.gif"
    ], { eager: true });

    for (const path in imports) {
        if (fileName === path.split("/").at(-1)) {
            return imports[path].default;
        };
    };
};

export const GET: RequestHandler = async ({ params }) => {
    let imagePath = await getImage(params.slug);

    // Escape special characters if assets are under a collection
    if (imagePath.includes("%5B") || imagePath.includes("%5D")) {
        imagePath = imagePath.replace("%5B", "\[").replace("%5D", "\]")
    }

    if (imagePath) {
        return new Response(await Bun.file(path.join(searchForWorkspaceRoot(process.cwd()), imagePath)).arrayBuffer());
    } else {
        return new Response("Asset not found", { status: 404 });
    }
};
