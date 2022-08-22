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

  // on recupere les elements du DOM
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let adresse = document.getElementById("address");
  let city = document.getElementById("city");
  let email = document.getElementById("email");

  let submit = document.getElementById("order");

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
      if (basket === null ) {
        alert("Ajouter un produit au panier avant de commander");
        return false;
      } else if (regExpFirstName.test(valueFirstName) == false) {
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
      //Si les champs son valider on envois les données a l'api pour retouner un bon de commande
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
        console.log(cartOrder)
        fetch("http://localhost:3000/api/products/order", {
          method : "POST",
          headers : {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userOrder),
        }).then(response => response.json())
        .then((data) => {
           window.location.href = "./confirmation.html?orderId=" + data.orderId
        })
      }
    }
    validationForm();
  });
};
productBasket();
