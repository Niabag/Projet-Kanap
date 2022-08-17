cartItem = document.getElementById("cart__items");

const productBasket = async () => {
  //Connection a l'API avec la methode fetch
  const res = await fetch("http://localhost:3000/api/products");

  if (!res.ok) {
    console.log("ERREUR");
    return;
  }

  const data = await res.json();

  //On recupere les donnés dans le local storage
  let basket = JSON.parse(localStorage.getItem("basket"));

  //On recupere le panier
  function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
      return [];
    } else {
      return JSON.parse(basket);
    }
  }

  //Fonction pour sauvgarder notre panier
  function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
  }

  //Un tableau vide pour regouper le resultat du total des prix produit
  totalArray = [];

  //On creer notre produit et on ajoute ses donnés

  basket.forEach((localStorage) => {
    data.forEach((data) => {
      if (data._id === localStorage.id) {
        price = data.price;
      }
    });

    const itemBasket = `
      <article class="cart__item" data-id="${localStorage.id}" data-color="${localStorage.colorResult}">
      <div class="cart__item__img">
        <img src="${localStorage.imgResult}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${localStorage.titleResult}</h2>
          <p>${localStorage.colorResult}</p>
          <p>${price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorage.quantityResult}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
                `;
    cartItem.innerHTML += itemBasket;

    //On calcule le totale du prix
    function totalPriceProduct() {
      totalPriceResult = localStorage.quantityResult * price;
      return totalPriceResult;
    }
    totalPriceProduct();

    totalArray.push(totalPriceResult);
    const totalPrice = totalArray.reduce((accumulator, currentValue) => {
      return (accumulator += currentValue);
    });

    totalQuantity = document.getElementById("totalPrice");
    totalQuantity.innerHTML = totalPrice;
  });

  //On calcule le totale de quantité et on ajoute le totale de quantité dans le DOM
  function totalQuantityBasket() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
      totalQuantityResult = number += product.quantityResult;
    }
    return totalQuantityResult;
  }

  totalQuantityResult = totalQuantityBasket();
  totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = totalQuantityResult;

  
  //On change la valeur d'un produit
  let itemQuantity = document.querySelectorAll(".itemQuantity");

  Array.prototype.filter.call(itemQuantity, (element) => {
    let parent = element.closest("article");
    let parentId = parent.dataset.id;
    let parentColor = parent.dataset.color;

    element.addEventListener("change", (e) => {
      let newQuantity = element.value;
      let foundProduct = basket.filter(
        (p) => p.colors === parentColor && p._id === parentId
      )[0];
      foundProduct.quantityResult = newQuantity;

      saveBasket(basket);
    
    });

  
 });

};
productBasket();
