const img = document.querySelector(".item__img");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const colors = document.getElementById("colors");

//Recuperation de l'id du produit dans l'url
const url = new URLSearchParams(window.location.search);
const id = url.get("id");

//Connection a l'API avec la methode fetch avec l'id du produit en parametre
const product = async () => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);

  if (!res.ok) {
    console.log("ERREUR");
    return;
  }

  const data = await res.json();
  

  //Ajout des données du produit en dynamique
  //img
  const productImg = `
        <img src="${data.imageUrl}" alt="Photographie d'un canapé">
        `;
  img.innerHTML = productImg;
  //titre
  title.textContent = data.name;
  //prix
  price.textContent = data.price;
  //Description
  description.innerHTML = data.description;
  //Couleur
  data.colors.forEach((element) => {
    const productColor = `
    <option value="${element}">${element}</option>
    `;
    colors.innerHTML += productColor;
  });

  //-------------Local storage------------------------
  //On ajoute les données saisies et on les ajoute  dans le localstorage
  const quantity = document.getElementById("quantity");
  const button = document.getElementById("addToCart");

  const titleResult = title.innerHTML;
  const imgResult = img.getElementsByTagName("img")[0].getAttribute("src");
  let colorResult = colors.addEventListener("change", function () {
    let value = colors.options[colors.selectedIndex].value;
    colorResult = value;
  });
  let quantityResult = quantity.addEventListener("change", function () {
    quantityResult = Number(quantity.value);
  });
  const descriptionResult = description.innerHTML;

  //Fonction pour sauvgarder notre panier
  function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
  }

  //On recupere le panier
  function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
      return [];
    } else {
      return JSON.parse(basket);
    }
  }

  //Si deux produits ont la meme couleur alors ils se cumulent en un dans le localstorege
  function addBasket(kanap) {
    let basket = getBasket();
    let foundKanap = basket.find(
      (p) => p.id === kanap.id && p.colorResult === kanap.colorResult
    );
    if (foundKanap && foundKanap.colorResult === kanap.colorResult) {
      foundKanap.quantityResult += kanap.quantityResult;
    } else {
      basket.push(kanap);
    }

    saveBasket(basket);
  }

  //Ajout au panier au clic du bouton ajouter au panier
  function valitation() {
    button.addEventListener("click", () => {
      addBasket({
        id,
        titleResult,
        imgResult,
        descriptionResult,
        colorResult,
        quantityResult,
      });
      alert("Produit ajouté au panier");
    });
  }
  valitation();
};

product();
