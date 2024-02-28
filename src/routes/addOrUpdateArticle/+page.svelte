<script>
    import { beforeUpdate, onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    import Form from '$lib/components/Form.svelte';
    import Champ from '$lib/components/Champ.svelte';

    import { getUserConnecte } from '$lib/scripts/User.js';
    import { getArticle, ajouterArticle, editerArticle } from '$lib/scripts/Article.js';

    beforeUpdate(() => {
        let user = getUserConnecte();    
        if (!user || !user.estCommercant) {
            // On doit être connecté et en tant que client pour accéder à cette page
            goto('/');
        }
    });

    async function uploadFile(file) {
        const response = await fetch('/upload', {
			method: 'POST',
			body: JSON.stringify(file),
			headers: {
				'Content-Type': 'application/json'
			}
		});

        console.log(response);
    }

    let articleForm = { nom : "", prix : "", quantite : "", image : null};
    let titreForm = "Ajout d'un article";
    let buttonForm = "Ajouter";

    let idArticleAModifier = null;  
    let isRequired = false;  
    let finDuOnMount = false;
    onMount(() => {
        const url = window.location.href;
        const params = new URLSearchParams(url.split('?')[1]);

        idArticleAModifier = params.get("idArticle");
        if(idArticleAModifier != null) {
            let article = getArticle(idArticleAModifier);
            articleForm.nom = article.nom;
            articleForm.prix = article.prix;
            articleForm.quantite = article.quantite;

            titreForm = "Modifier l'article \"" + articleForm.nom + "\"";
            buttonForm = "Modifier";
        }

        isRequired = idArticleAModifier == null;

        finDuOnMount = true;
    });

    function handleSubmit(event) {
        event.preventDefault();

        if (articleForm.image != null) {
            uploadFile(articleForm.image);
        }

        if (idArticleAModifier == null) {
            ajouterArticle(articleForm.nom, articleForm.prix, articleForm.quantite, articleForm.image.name);
        } else {
            editerArticle(idArticleAModifier, articleForm.nom, articleForm.prix, articleForm.quantite, articleForm.image ? articleForm.image.name : null);
        }
        goto('/gestionArticles');
    }
</script>

<main>
    <Form titre={titreForm} fn_onsubmit={handleSubmit}>
        {#if finDuOnMount}
            <Champ label="Nom" bind:value={articleForm.nom} />
            <Champ label="Prix" type="number" step="0.01" bind:value={articleForm.prix} />
            <Champ label="Photo" type="file" bind:value={articleForm.image} required={isRequired}/>
            <Champ label="Quantité" type="number" bind:value={articleForm.quantite} />
            <Champ label={buttonForm} type="submit" />
        {/if}
    </Form>
</main>