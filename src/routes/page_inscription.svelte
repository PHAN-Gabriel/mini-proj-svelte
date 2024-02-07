<script>
    import Champ from './Champ.svelte';
</script>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div {
        border: solid;
        padding: 2em;
    }
</style>

<form method="POST">
    <div>
        <Champ label="Nom" />
        <Champ label="Prénom" />
        <Champ label="Pseudonyme" />
        <Champ label="Mot de passe" />
        <Champ label="Confirmer le mot de passe" />
        <Champ label="Est commerçant" type="checkbox" />
        <Champ label="Confirmer" type="submit" />
    </div>
</form>