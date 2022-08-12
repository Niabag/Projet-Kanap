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

  //On creer notre produit et on ajoute ses donnés

  basket.forEach((localStorage) => {
    data.forEach((data) => {
      if (data._id === localStorage.id) {
        price = data.price;
      }
    });

    console.log(totalItem);
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
  });
};

productBasket();
