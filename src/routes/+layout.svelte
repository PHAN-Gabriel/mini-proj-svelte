<script>
	import { goto } from '$app/navigation';
	import { beforeUpdate } from 'svelte';

    import Bouton from '$lib/components/Bouton.svelte';
	
    import IoIosLogOut from 'svelte-icons/io/IoIosLogOut.svelte';
	import IoMdBasket from 'svelte-icons/io/IoMdBasket.svelte'
	import FaHome from 'svelte-icons/fa/FaHome.svelte'

    import { logOut, estConnecte, getUserConnecte } from '$lib/scripts/User.js';

	let afficher = false;
	beforeUpdate(() => { afficher = estConnecte()});

	let userConnecte = getUserConnecte();
</script>

<nav class="bg-secondary bg-gradient d-flex justify-content-between mb-2 border-bottom border-2 border-black" style="height: 3em">
	<Bouton Bouton={FaHome} onClick={() => goto("/")} />

	<h2>Le Marché Maraîcher</h2>

		<div class="d-flex">
			{#if afficher}
				{#if userConnecte != null}
					<span class="d-flex align-items-center text-light me-3">Bonjour {userConnecte.nom + " " + userConnecte.prenom}</span>
					{#if !userConnecte.estCommercant }
						<Bouton Bouton={IoMdBasket} onClick={ () => goto('/gestionPanier') } />
					{/if}
				{/if}

				<Bouton Bouton={IoIosLogOut} onClick={ logOut } />
			{/if}
		</div>
</nav>

<slot />