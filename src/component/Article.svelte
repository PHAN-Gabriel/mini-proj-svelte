<script>
    // Définissez les propriétés de votre composant
    export let nom;
    export let prix;
    export let image;
  
    // Déclarez une variable pour stocker la quantité d'articles
    let quantite = 0;
  
    // Fonction pour réduire la quantité
    function reduireQuantite() {
      if (quantite > 0) {
        quantite--;
      }
    }
  
    // Fonction pour augmenter la quantité
    function augmenterQuantite() {
      quantite++;
    }
  </script>
  
  <style>
    /* Utilisez du CSS pour aligner les éléments */
    .article {
      text-align: center;
      margin-bottom: 20px;
    }
  
    .image {
      width: 200px; /* Ajustez la taille de l'image selon vos besoins */
      height: 200px; /* Taille fixe pour l'image carrée */
      display: block;
      margin: 0 auto;
      object-fit: cover; /* Force l'image à rogner pour s'adapter à la taille spécifiée */
    }
  
    .nom {
      font-weight: bold;
      margin-top: 10px;
    }
  
    .prix {
      margin-top: 5px;
    }
  
    .quantite {
      margin-top: 10px;
    }
  
    .quantite-button {
      padding: 5px 10px;
      cursor: pointer;
    }
  </style>
  
  <div class="article">
    <!-- Affichez l'image -->
    <img src={image} alt="Image de l'article" class="image">
  
    <!-- Affichez le nom de l'article -->
    <div class="nom">{nom}</div>
  
    <!-- Affichez le prix de l'article -->
    <div class="prix">{prix}</div>
  
    <!-- Affichez la quantité d'articles avec des boutons + et - -->
    <div class="quantite">
      <button class="quantite-button" on:click={reduireQuantite}>-</button>
      <span>{quantite}</span>
      <button class="quantite-button" on:click={augmenterQuantite}>+</button>
    </div>
  </div>
  