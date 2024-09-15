<script lang="ts">
    import SocialHandle from "$lib/components/SocialHandle.svelte";

    // @ts-ignore
    import userdata from "../user.yml";

    // Custom sizes for better optical fit
    const icon_sizes = { gpg: 25, email: 26, discord: 28, matrix: 26 }
</script>

{#each userdata.handles as e}
    <SocialHandle platform={e.service} value={e.value}
                  iconSize={icon_sizes[e.service.toLowerCase()]} />
{/each}
