 
    function removeFromBasket(product){
        let product = getBasket();
        product = basket.filter(p => p.id != basket.id)
        saveBasket(product)
    }