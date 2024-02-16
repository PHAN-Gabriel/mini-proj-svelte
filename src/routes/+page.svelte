<script>
    import Button from "@smui/button";
    import AccueilAdmin from "./accueilAdmin.svelte";
</script>

<header class="header">
    %sveltekit.head%
</header>

<AccueilAdmin/>

<style>
    .header {
        background-color: black;
    }
</style>