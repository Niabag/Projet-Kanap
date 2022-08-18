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

    //On calcule le totale du prix et on l'ajoute dans le DOM
    totalQuantityPrice = document.getElementById("totalPrice");
    function totalPriceProduct() {
      totalPriceResult = localStorage.quantityResult * price;
      totalArray.push(totalPriceResult);
      const totalPrice = totalArray.reduce((accumulator, currentValue) => {
        return (accumulator += currentValue);
      });
      totalQuantityPrice.innerHTML = totalPrice;
    }
    totalPriceProduct();
  });

  //On change la valeur d'un produit
  let itemQuantity = document.querySelectorAll(".itemQuantity");

  Array.prototype.filter.call(itemQuantity, (element) => {
    let parent = element.closest("article");
    let parentId = parent.dataset.id;
    let parentColor = parent.dataset.color;

    element.addEventListener("change", (e) => {
      let newQuantity = element.value;
      let foundProduct = basket.find(
        (p) => p.colorResult === parentColor && p.id === parentId
      );
      foundProduct.quantityResult = parseInt(newQuantity);
      saveBasket(basket);
      totalQuantityBasket();
    });
  });

  //On calcule le total de quantité et on ajoute le totale de quantité dans le DOM
  totalQuantity = document.getElementById("totalQuantity");
  function totalQuantityBasket() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
      totalQuantityResult = number += product.quantityResult;
    }
    totalQuantity.innerHTML = totalQuantityResult;
  }
  totalQuantityBasket();

  let removeProduct = document.querySelectorAll(
    ".cart__item__content__settings__delete"
  );

  //On supprime un element
  Array.prototype.filter.call(removeProduct, (element) => {
    let parent = element.closest("article");
    let parentId = parent.dataset.id;
    let parentColor = parent.dataset.color;

    element.addEventListener("click", (e) => {
      let foundProduct = basket.find(
        (p) => p.colorResult === parentColor && p.id === parentId
      );
      let index = basket.indexOf(foundProduct);
      basket.splice(index, 1);
      saveBasket(basket);

      window.location.reload();

      if (basket.length < 1) {
        localStorage.clear();
      }
    });
  });
};
productBasket();
