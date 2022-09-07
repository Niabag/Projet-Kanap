const products = document.getElementById("items");

const card = async () => {
  //Connection a l'API avec la methode fetch
  const res = await fetch("http://localhost:3000/api/products");

  if (!res.ok) {
    console.log("ERREUR");
    return;
  }

  const data = await res.json();
  //generation du code htlm des cartes completées avec l'API
  data.forEach((element) => {
    const card = `
              <a href="./product.html?id=${element._id}">
              <article>
                  <img src="${element.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                  <h3 class="productName">${element.name}</h3>
                  <p class="productDescription">${element.description}</p>
              </article>
              </a> 
              `;
    products.innerHTML += card;
  });
};

card();
