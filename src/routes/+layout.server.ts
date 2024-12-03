import type { LayoutServerLoad } from "./$types";
import { getGitCommitHash, getGitHTTPUrl } from "$lib/utils/gitUtils";

export const load: LayoutServerLoad = async () => {
	return {
        gitCommitHash: getGitCommitHash(),
		gitHTTPUrl: getGitHTTPUrl()
	};
};
