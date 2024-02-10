<script>
    import Champ from './Champ.svelte';

    let data = { nom : "", prenom : "", pseudo : "", mdp : "", mdpConfirm : "", estCommercant : false };
    let mdpConfirmErrors;

    function creerCompte(event) {
        event.preventDefault();
        if (data.mdp != data.mdpConfirm) {
            mdpConfirmErrors = "Les mots de passe ne sont pas identiques !";
            return;
        } else {
            if (localStorage["users"] == undefined) {
                // On a jamais stocké un utilisateur, donc on commence par en créer une avec l'identifiant 0
                localStorage.setItem("users", JSON.stringify({0 : data}));
            } else {
                let users = JSON.parse(localStorage.getItem('users'));
                let nouveauIdentifiant = Math.max(...Object.keys(users).map(Number)) + 1

                users[nouveauIdentifiant] = data;
                localStorage["users"] = JSON.stringify(users);
            }
        }

    }
</script>

<form on:submit={creerCompte} class="d-flex flex-column align-items-center">
    <div class="border border-dark border-2 w-25 px-4 py-2" style="min-width: 20em">
        <h1>Inscription</h1>
        <Champ label="Nom" bind:value={data.nom} />
        <Champ label="Prénom" bind:value={data.prenom} />
        <Champ label="Pseudonyme" bind:value={data.pseudo} />
        <Champ label="Mot de passe" type="password" bind:value={data.mdp} />
        <Champ label="Confirmer le mot de passe"  type="password" bind:value={data.mdpConfirm} errors={mdpConfirmErrors} />
        <Champ label="Est commerçant" type="checkbox" bind:value={data.estCommercant} />
        <Champ label="Confirmer" type="submit" />
    </div>
</form>
