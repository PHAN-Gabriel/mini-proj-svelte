<script>
    import { sha256 } from 'js-sha256';

    import Form from '$lib/components/Form.svelte';
    import Champ from '$lib/components/Champ.svelte';
    import { getUsers, getIdUserByPseudo, faireConnecter } from '$lib/scripts/User.js';

    export let fn_redirection;

    let estFormConnexion = true;
    let inscription = { nom : "", prenom : "", pseudo : "", mdp : "", estCommercant : false };
    let mdpConfirm = "";
    let connexion = { pseudo : "", mdp : "" };
    let inscriptionPseudoErreur = "";
    let connexionPseudoErreur = "";
    let mdpErreur = "";
    let mdpConfirmErreur = "";

    function clearInputInscription() {
        inscription = { nom : "", prenom : "", pseudo : "", mdp : "", estCommercant : false };
        mdpConfirm = "";
    }

    function toggleEstFormConnexion() {
        estFormConnexion = !estFormConnexion;
    }

    function seConnecter(event) {
        connexionPseudoErreur = "";
        mdpErreur = "";

        event.preventDefault();

        let userId = getIdUserByPseudo(connexion.pseudo);

        if (userId) {
            let users = getUsers();

            // On a trouvé les données de l'utilisateur
            if (users[userId].mdp == sha256(connexion.mdp)) {
                faireConnecter(userId);
                fn_redirection();
            } else {
                mdpErreur = "Votre mot de passe est invalide";
            }
        } else {
            connexionPseudoErreur = "Votre pseudonyme est inexistant";
        }
    }

    function creerCompte(event) {
        inscriptionPseudoErreur = "";
        mdpConfirmErreur = "";

        event.preventDefault();

        if (getIdUserByPseudo(inscription.pseudo)) {
            inscriptionPseudoErreur = "Ce pseudonyme est déjà utilisé !";
        } else if (inscription.mdp != mdpConfirm) {
            mdpConfirmErreur = "Les mots de passe ne sont pas identiques !";
        } else {
            let data = inscription;
            data.mdp = sha256(inscription.mdp);

            let users = getUsers();
            if (users) {
                let nouveauIdentifiant = Math.max(...Object.keys(users).map(Number)) + 1

                users[nouveauIdentifiant] = data;
                localStorage["users"] = JSON.stringify(users);
            } else {
                // On a jamais stocké un utilisateur, donc on commence par en créer une avec l'identifiant 0
                localStorage.setItem("users", JSON.stringify({0 : data}));
            }

            estFormConnexion = true;
            clearInputInscription();
        }
    }
</script>

<style>
    .cursor-pointer {
        cursor: pointer;
    }
</style>

{#if estFormConnexion}
    <Form titre="Connexion" fn_onsubmit={seConnecter}>
            <Champ label="Pseudonyme" bind:value={connexion.pseudo}  bind:erreur={connexionPseudoErreur}/>
            <Champ label="Mot de passe" type="password" bind:value={connexion.mdp}  bind:erreur={mdpErreur}/>
            <Champ label="Se connecter" type="submit" />
        <p>Pas encore inscrit ? <span class="text-primary text-decoration-underline cursor-pointer" on:click={toggleEstFormConnexion}>S'inscrire</span></p>
    </Form>
{:else}
    <Form titre="Inscription" fn_onsubmit={creerCompte}>
        <Champ label="Nom" bind:value={inscription.nom} />
        <Champ label="Prénom" bind:value={inscription.prenom} />
        <Champ label="Pseudonyme" bind:value={inscription.pseudo} bind:erreur={inscriptionPseudoErreur} />
        <Champ label="Mot de passe" type="password" bind:value={inscription.mdp} />
        <Champ label="Confirmer le mot de passe"  type="password" bind:value={mdpConfirm} bind:erreur={mdpConfirmErreur} />
        <Champ label="Est commerçant" type="checkbox" bind:value={inscription.estCommercant} />
        <Champ label="S'inscrire" type="submit" />
        <p>Déjà inscrit ? <span class="text-primary text-decoration-underline cursor-pointer" on:click={toggleEstFormConnexion}>Se connecter</span></p>
    </Form>
{/if}