import type { LayoutServerLoad } from "./$types";
import { getGitCommitHash, getGitHTTPUrl } from "$lib/utils/gitUtils";
import iconMap from "$lib/utils/iconMap";
import { env } from '$env/dynamic/private';

export const load: LayoutServerLoad = async () => {
	return {
        gitCommitHash: getGitCommitHash(),
		gitHTTPUrl: getGitHTTPUrl(),
		analyticsURL: (env.ANALYTICS === "true") ? env.ANALYTICS_CODE : undefined,
		iconMap
	};
};
