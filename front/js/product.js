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

//-------------Local storage------------------------
    const quantity = document.getElementById("quantity")
    const button = document.getElementById("addToCart")

    const titleRusult = title.innerHTML
    const imgResult = img.getElementsByTagName('img')[0].getAttribute("src")
    let colorResult = 
    colors.addEventListener('change', function() {
        var value = colors.options[colors.selectedIndex].value;
        colorResult = value;
      })
    let quantityResult = 
    quantity.addEventListener('change', function() {
        quantityResult = quantity.value
      })
    const descriptionRusult = description.innerHTML


    function saveProduct(product){
        localStorage.setItem("product", JSON.stringify(product));
    }
    
    function getProduct(){
       let product = localStorage.getItem("product");
       if (product == null){
            return [];
       }else{
            return JSON.parse(product);
       }
    }
    
    function addProduct(kanap){
        let product = getProduct();
   
        product.push(kanap);
        saveProduct(product);
    }
    
    function valitation(){
        button.addEventListener('click',() => {
            addProduct({id,titleRusult,imgResult,descriptionRusult,colorResult,quantityResult})
        }) 
    }
    valitation()
    
}


product()


