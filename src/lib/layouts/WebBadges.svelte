<script lang="ts">
    import BadgeMarquee from "$lib/components/BadgeMarquee.svelte";
</script>

<header>
    <div class="badge-header">
        <p>Web badges</p>
    </div>
</header>
<BadgeMarquee />

<style lang="scss">
    header {
        font-family: "Rubik";
        display: flex;
        justify-content: space-between;

        .badge-header {
            color: var(--text-color);
            display: flex;
            align-items: center;
            gap: 0.33rem;
            width: fit-content;
            font-size: 0.9rem;
            padding: 5px 8px;
            margin: 5px;
            border-radius: calc(var(--border-radius) - 5px);
            background-color: #454549;
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
        }
    }
</style>
