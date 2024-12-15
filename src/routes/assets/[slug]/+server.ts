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
    let imagePath: string = await getImage(params.slug);

    if (imagePath) {
        // Escape special characters if assets are under a collection
        if (imagePath.includes("%5B") && imagePath.includes("%5D")) {
            imagePath = imagePath.replace("%5B", "\[").replace("%5D", "\]");
        }

        // HACK: Add missing directory to the path if asset is fetched from a build (prod) environment
        if (imagePath.startsWith("/_app/immutable")) {
            imagePath = "/client" + imagePath;
        }

        const assetPath = path.join(searchForWorkspaceRoot(process.cwd()), imagePath);

        return new Response(await Bun.file(assetPath).arrayBuffer());
    } else {
        return new Response("Asset not found", { status: 404 });
    }
};
