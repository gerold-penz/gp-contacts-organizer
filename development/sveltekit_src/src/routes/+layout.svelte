<script lang="ts">
    import "../app.scss"
    import Header from "$lib/components/Header.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import { onMount } from "svelte"


    const {children} = $props()

    onMount(async () => {
        const {Tooltip, Collapse} = await import("bootstrap")

        // Tooltips aktivieren
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltipTriggerEl) => {
            new Tooltip(tooltipTriggerEl)
        })
    })
</script>


<!-- Header BEGIN -->
<Header/>
<!-- Header END -->


<!-- Content BEGIN -->
{@render children()}
<!-- Content END -->


<!-- Footer BEGIN -->
<Footer/>
<!-- Footer END -->


<style lang="scss">
</style>
