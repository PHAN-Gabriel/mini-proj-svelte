<script>
    import PageInscription from "./page_inscription.svelte";

    function isConnected() {
		return false;
	}
</script>

{#if isConnected()}
<p>Condition is true</p>
{:else}
    <PageInscription />
{/if}