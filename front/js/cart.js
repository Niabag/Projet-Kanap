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
  const totalArray = [];

  //Calcule tu total du prix de nos produit
  function totalPriceProduct(product, price) {
    totalPriceResult = product.quantityResult * price;
    totalArray.push(totalPriceResult);
    const totalPrice = totalArray.reduce((accumulator, currentValue) => {
      return (accumulator += currentValue);
    });
    return totalPrice;
  }

  //Ajout les donnés des articles dynamiquement
  if (basket != null) {
    basket.forEach((product) => {
      data.forEach((data) => {
        if (data._id === product.id) {
          price = data.price;
        }
      });

      const itemBasket = `
      <article class="cart__item" data-id="${product.id}" data-color="${product.colorResult}">
        <div class="cart__item__img">
          <img src="${product.imgResult}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.titleResult}</h2>
            <p>${product.colorResult}</p>
            <p>${price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantityResult}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
                `;
      cartItem.innerHTML += itemBasket;

      //On ajoute le total du prix dans le DOM
      totalQuantityPrice = document.getElementById("totalPrice");

      totalQuantityPrice.innerHTML = totalPriceProduct(product, price);
    });

    //On change la quantité d'un produit
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
        location.reload();
      });
    });

    //On calcule le total d'articles et on ajoute le total de quantité dans le DOM
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

    //On supprime un article du panier
    let removeProduct = document.querySelectorAll(
      ".cart__item__content__settings__delete"
    );

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
  
  //On affiche le formulaire si le panier n'est pas vide
  } else {
    const form = document.querySelector(".cart__order");
    form.style.display = "none";
  }
  // on recupere les elements du DOM
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let adresse = document.getElementById("address");
  let city = document.getElementById("city");
  let email = document.getElementById("email");

  //On masque le formulaire si le panier est vide 
  let submit = document.getElementById("order");
  if (basket === null) {
    const form = document.querySelector(".cart__order");
    form.style.display = "none";
  }

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    //On recupere la saisie de l'utilisateur dans les champs de saisie
    let valueFirstName = firstName.value.trim();
    let valueLastName = lastName.value.trim();
    let valueAdresse = adresse.value.trim();
    let valueCity = city.value.trim();
    let valueEmail = email.value.trim();

    //Outil regexp pour verifier si la saisie est conforme
    let regExpFirstName = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    let regExpLastName = regExpFirstName;
    let regExpteAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/;
    let regExpCity = regExpFirstName;
    let regExpEmail =
      /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

    //On recupere le message d'erreur pour chaque champs
    let errorFirstName = document.getElementById("firstNameErrorMsg");
    let errorLastName = document.getElementById("lastNameErrorMsg");
    let errorAddress = document.getElementById("addressErrorMsg");
    let errorCity = document.getElementById("cityErrorMsg");
    let errorEmail = document.getElementById("emailErrorMsg");

    function validationForm() {
      basket = getBasket();
  
      //On verifie les champs de saisie avec les regexp
      if (regExpFirstName.test(valueFirstName) == false) {
        errorFirstName.innerHTML = "Entrer un nom valide";
        return false;
      } else if (regExpLastName.test(valueLastName) == false) {
        errorLastName.innerHTML = "Entrer un prénom valide";
        return false;
      } else if (regExpteAddress.test(valueAdresse) == false) {
        errorAddress.innerHTML = "Entrer une adresse valide";
        return false;
      } else if (regExpCity.test(valueCity) == false) {
        errorCity.innerHTML = "Entrer une ville valide";
        return false;
      } else if (regExpEmail.test(valueEmail) == false) {
        errorEmail.innerHTML = "Entrer un email valide";
        return false;
      }
      //Si les champs sont valides on envoie les données a l'api pour retouner un bon de commande
      else {
        let contact = {
          firstName: firstName.value,
          lastName: lastName.value,
          address: adresse.value,
          city: city.value,
          email: email.value,
        };

        let cartOrder = [];
        basket.forEach((product) => {
          cartOrder.push(product.id);
        });

        let userOrder = { contact: contact, products: cartOrder };
  
        fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userOrder),
        })
          .then((response) => response.json())
          .then((data) => {
            window.location.href =
              "./confirmation.html?orderId=" + data.orderId;
          });
      }
    }
    validationForm();
  });
};
productBasket();
