export function getGitCommitHash() {
    const { stdout } = Bun.spawnSync({
        cmd: ["git", "rev-parse", "--short", "HEAD"],
        stdout: "pipe"
    });

    return stdout.toString();
}

export function getGitHTTPUrl(blob: boolean = true): string {
    let url: string;
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

    if (blob) {
        branch = "blob/" + branch
    }

    if (repoURL.startsWith("git@github.com")) {
        url = "https://github.com/" + repoURL.split(":")[1].replace(".git", "/") + branch;
    } else if (repoURL.startsWith("http")) {
        url = repoURL + "/" + branch;
    } else {
        throw new Error("Unsupported Git URL format: " + repoURL);
    }

    return url;
}
