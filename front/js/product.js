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
     quantityResult = Number(quantity.value)
        
      })
    const descriptionRusult = description.innerHTML


    function saveBasket(basket){
        localStorage.setItem("basket", JSON.stringify(basket));
    }
    
    function getBasket(){
       let basket = localStorage.getItem("basket");
       if (basket == null){
            return [];
       }else{
            return JSON.parse(basket);
       }
    }
    
    function addBasket(kanap){
        let basket = getBasket();
        let foundKanap = basket.find(p => p.id == kanap.id);
        if(foundKanap && foundKanap.colorResult === kanap.colorResult){
            foundKanap.quantityResult += kanap.quantityResult
        }else{
            basket.push(kanap);    
        }

        saveBasket(basket);    
    }
    
 
    function removeFromBasket(){
        let product = getBasket();
        product = basket.filter(p => p.id != basket.id)
        saveBasket(product)
    }

   
    

    function valitation(){
        button.addEventListener('click',() => {
            
            addBasket({id,titleRusult,imgResult,descriptionRusult,colorResult,quantityResult})
        }) 
    }
    valitation()
    
}


product()
