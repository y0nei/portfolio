<script lang="ts">
    import SocialHandle from "$lib/components/bento/SocialHandle.svelte";
    import userdata from "$lib/user.yml";

    // Custom sizes for better optical fit
    const icon_sizes: Record<string, number> = {
        gpg: 25,
        email: 26,
        discord: 28,
        matrix: 26
    };
</script>

{#each userdata.handles as e}
    <SocialHandle platform={e.service} value={e.value}
                  iconSize={icon_sizes[e.service.toLowerCase()]} />
{/each}
