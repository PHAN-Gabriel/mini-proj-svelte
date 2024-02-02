<script>
    import Button from "@smui/button";
    let labels = ["Un", "Deux", "Trois"];
    let index = 0;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button on:click={() => {index = (index + 1) % 3; }} variant="raised">{labels[index]}</Button>