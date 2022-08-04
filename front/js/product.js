const img = document.querySelector(".item__img");
const title = document.getElementById("title")
const description = document.getElementById("description");
const price = document.getElementById("price");
const colors = document.getElementById("colors");
//
const url = new URLSearchParams(window.location.search)
const id = url.get("id")

//
const product = async () => {

    const res = await fetch(`http://localhost:3000/api/products/${id}`);

    if (!res.ok) {
        console.log("ERREUR");
        return;
    }

    const data = await res.json();

    console.log(data)
    //img
    const productImg =
        `
        <img src="${data.imageUrl}" alt="Photographie d'un canapé">
        `
    img.innerHTML = productImg;
    //titre
    title.textContent = data.name;
    //prix

    price.textContent = data.price;
    //Description
    description.innerHTML = data.description;
    //Couleur
    //
    data.colors.forEach((element) => {
        
        const productColor =
            `
            <option value="${element}">${element}</option>
            `
        colors.innerHTML += productColor;
    });

}
product()