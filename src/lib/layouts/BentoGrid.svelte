<script lang="ts">
    import Icon from "$lib/components/IconLoader.svelte";

    import BentoItem from "$lib/components/BentoItem.svelte";
    import Handles from "$lib/layouts/Handles.svelte";
    import BadgeMarquee from "$lib/components/BadgeMarquee.svelte";
    import WebringSelector from "$lib/components/WebringSelector.svelte";
    import BentoButton from "$lib/components/BentoButton.svelte";
</script>

<div class="bento-grid">
    <BentoItem name="handles">
        <Handles />
    </BentoItem>
    <BentoItem name="badges">
        <p slot="header">Web Badges</p>
        <BadgeMarquee />
    </BentoItem>
    <BentoItem name="webrings">
        <p slot="header">Webrings</p>
        <div class="webring-wrapper">
            <WebringSelector name="CSS Joy"
                href.previous="https://webri.ng/webring/cssjoy/previous?via=https://yonei.dev/"
                href.random="https://webri.ng/webring/cssjoy/random?via=https://yonei.dev/"
                href.next="https://webri.ng/webring/cssjoy/next?via=https://yonei.dev/"
            />
            <WebringSelector name="Fediring"
                href.previous="https://fediring.net/previous?yonei.dev"
                href.random="https://fediring.net/random"
                href.next="https://fediring.net/next?host=yonei.dev"
            />
        </div>
    </BentoItem>
    <BentoItem name="buttons" hollow>
        <BentoButton href="https://status.mossycab.in/status/all" target="_blank">Service status</BentoButton>
        <BentoButton href="#">Blog <Icon name="blog" size={18} /></BentoButton>
    </BentoItem>
</div>

<style lang="scss" global>
    .bento-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1rem;
        width: 100%;

        .webring-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 5px;
            margin-top: 0;
            flex: 1;
            gap: 0.5rem;
        }

        .section-buttons a:last-child {
            gap: 0.33rem;
            color: var(--background-color);
            background-color: var(--accent-color);
        }
    }
</style>
