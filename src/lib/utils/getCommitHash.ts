import childProcess from "child_process";

export function getGitCommitHash() {
    const hash = childProcess.execSync("git rev-parse --short HEAD")

    return hash.toString().trim();
}

