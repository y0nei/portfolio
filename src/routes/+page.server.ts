import type { PageServerLoad } from './$types';
import { getGitCommitHash } from '$lib/utils/getCommitHash';

export const load: PageServerLoad = async () => {
	return {
        gitCommitHash: getGitCommitHash()
	};
};
