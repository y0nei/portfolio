import type { LayoutServerLoad } from "./$types";
import { getGitCommitHash, getGitHTTPUrl } from "$lib/utils/gitUtils";
import iconMap from "$lib/utils/iconMap";

export const load: LayoutServerLoad = async () => {
	return {
        gitCommitHash: getGitCommitHash(),
		gitHTTPUrl: getGitHTTPUrl(),
		iconMap
	};
};
