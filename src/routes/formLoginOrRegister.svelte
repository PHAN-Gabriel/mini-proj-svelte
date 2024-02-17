<script>
    import { sha256 } from 'js-sha256';
    import Champ from './Champ.svelte';

    export let estConnecte = false; 
    let estFormConnexion = true;
    let inscription = { nom : "", prenom : "", pseudo : "", mdp : "", estCommercant : false };
    let mdpConfirm = "";
    let connexion = { pseudo : "", mdp : "" };
    let inscriptionPseudoErreur = "";
    let connexionPseudoErreur = "";
    let mdpErreur = "";
    let mdpConfirmErreur = "";

    function toggleEstFormConnexion() {
        estFormConnexion = !estFormConnexion;
    }

    function getIdUserByPseudo(pseudo) {
        let users = JSON.parse(localStorage.getItem('users'));
        let userId = null;

        if (users) {
            for (let id in users) {
                if(users[id].pseudo == pseudo) {
                    userId = id;
                    break;
                }
            }
        }

        return userId
    }

    function seConnecter(event) {
        connexionPseudoErreur = "";
        mdpErreur = "";

        event.preventDefault();

        estConnecte = false; 
        let userId = getIdUserByPseudo(connexion.pseudo);

        if (userId) {
            let users = JSON.parse(localStorage.getItem('users'));

            // On a trouvé les données de l'utilisateur
            if (users[userId].mdp == sha256(connexion.mdp)) {
                mdpErreur = "Yes!";
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

            let users = JSON.parse(localStorage.getItem('users'));
            if (users) {
                let nouveauIdentifiant = Math.max(...Object.keys(users).map(Number)) + 1

                users[nouveauIdentifiant] = data;
                localStorage["users"] = JSON.stringify(users);
            } else {
                // On a jamais stocké un utilisateur, donc on commence par en créer une avec l'identifiant 0
                localStorage.setItem("users", JSON.stringify({0 : data}));
            }
        }
    }
</script>

<style>
    .cursor-pointer {
        cursor: pointer;
    }
</style>

{#if estFormConnexion}
    <form on:submit={seConnecter} class="d-flex flex-column align-items-center">
        <div class="border border-dark border-2 w-25 px-4 py-2" style="min-width: 20em">
            <h1>Connexion</h1>
            <Champ label="Pseudonyme" bind:value={connexion.pseudo}  bind:erreur={connexionPseudoErreur}/>
            <Champ label="Mot de passe" type="password" bind:value={connexion.mdp}  bind:erreur={mdpErreur}/>
            <Champ label="Se connecter" type="submit" />
        </div>
        <p>Pas encore inscrit ? <span class="text-primary text-decoration-underline cursor-pointer" on:click={toggleEstFormConnexion}>S'inscrire</span></p>
    </form>
{:else}
    <form on:submit={creerCompte} class="d-flex flex-column align-items-center">
        <div class="border border-dark border-2 w-25 px-4 py-2" style="min-width: 20em">
            <h1>Inscription</h1>
            <Champ label="Nom" bind:value={inscription.nom} />
            <Champ label="Prénom" bind:value={inscription.prenom} />
            <Champ label="Pseudonyme" bind:value={inscription.pseudo} bind:erreur={inscriptionPseudoErreur} />
            <Champ label="Mot de passe" type="password" bind:value={inscription.mdp} />
            <Champ label="Confirmer le mot de passe"  type="password" bind:value={mdpConfirm} bind:erreur={mdpConfirmErreur} />
            <Champ label="Est commerçant" type="checkbox" bind:value={inscription.estCommercant} />
            <Champ label="S'inscrire" type="submit" />
        </div>
        <p>Déjà inscrit ? <span class="text-primary text-decoration-underline cursor-pointer" on:click={toggleEstFormConnexion}>Se connecter</span></p>
    </form>
{/if}