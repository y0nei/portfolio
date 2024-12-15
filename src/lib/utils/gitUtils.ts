export function getGitCommitHash() {
    const { stdout } = Bun.spawnSync({
        cmd: ["git", "rev-parse", "--short", "HEAD"],
        stdout: "pipe"
    });

    return stdout.toString();
}

export function getGitHTTPUrl(blob: boolean = true): string {
    let repoURL: string;
    let branch: string;

    try {
        repoURL = Bun.spawnSync({
            cmd: ["git", "remote", "get-url", "origin"],
            stdout: "pipe"
        }).stdout.toString().trim();

        branch = Bun.spawnSync({
            cmd: ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            stdout: "pipe"
        }).stdout.toString().trim();
    } catch (e) {
        throw new Error("Could not get Git URL, are you in a Git repository? " + e);
    }

    // Include blob entry in path
    branch = blob ? "blob/" + branch : branch

    if (repoURL.startsWith("git@")) {
        repoURL = repoURL.replace(":", "/").replace("git@", "https://");
    }
    if (repoURL.endsWith(".git")) {
        repoURL = repoURL.replace(".git", "/");
    }

    return repoURL + branch;
}
