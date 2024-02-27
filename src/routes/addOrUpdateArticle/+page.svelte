<script>
    import { beforeUpdate } from 'svelte';
    import { goto } from '$app/navigation';
    
    import Form from '$lib/components/Form.svelte';
    import Champ from '$lib/components/Champ.svelte';

    import { getUserConnecte } from '$lib/scripts/User.js';
    import { ajouterArticle } from '$lib/scripts/Article.js';

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

    let article = { nom : "", prix : "", quantite : "", image : ""};

    function handleSubmit() {
        event.preventDefault();

        uploadFile(article.image);
        ajouterArticle(article.nom, article.prix, article.quantite, article.image.name);
        goto('/gestionArticles');
    }
</script>

<main>
    <Form titre="Ajout d'un article" fn_onsubmit={handleSubmit}>
        <Champ label="Nom" bind:value={article.nom} />
        <Champ label="Prix" type="number" step="0.01" bind:value={article.prix} />
        <Champ label="Photo" type="file" bind:value={article.image} />
        <Champ label="Quantité" type="number" bind:value={article.quantite} />
        <Champ label="Ajouter" type="submit" />
    </Form>
</main>