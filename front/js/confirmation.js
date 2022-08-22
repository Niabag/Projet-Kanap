// On bascule vers la page de confirmation
if (document.URL.includes("confirmation.html")) {
    // Confirmation du numéro de commande
    const orderId = new URL(window.location.href).searchParams.get("orderId");
    let productOrder = () => {
      const selectId= document.getElementById("orderId");
  
      selectId.innerHTML = orderId;
    };
    productOrder();
    localStorage.clear();
  }
  