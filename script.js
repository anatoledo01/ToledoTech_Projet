
    
    
    const menu = document.getElementById("menu")
    const cartBtn = document.getElementById("cart-btn")
    const cartModal = document.getElementById("cart-modal")
    const cartItemsContainer = document.getElementById("cart-items")
    const cartTotal = document.getElementById("cart-total")
    const checkoutBtn = document.getElementById("checkout-btn")
    const closeModalBtn = document.getElementById("close-modal-btn")
    const cartCounter = document.getElementById("cart-count")
    const addressInput = document.getElementById("address")
    const addressWarn = document.getElementById("address-warn")

    let cart = [];


    cartBtn.addEventListener("click", function(){
        cartModal.style.display = "flex"
        atualizaCarrinho()
    })

    cartModal.addEventListener("click", function(event){
        if(event.target === cartModal){
            cartModal.style.display = "none"
        }
    })

    closeModalBtn.addEventListener("click", function(){
        cartModal.style.display = "none"
    })

    
    menu.addEventListener("click", function(event){
            let parentButton = event.target.closest(".add-to-cart-btn")

            if(parentButton){
                const name = parentButton.getAttribute("data-name")
                const price = parseFloat(parentButton.getAttribute("data-price"));
                adicionarCarrrinho(name, price)

             }

    })



function adicionarCarrrinho(name, price){


    const existingItem = cart.find(item =>item.name === name)

    if(existingItem){
        existingItem.quantity +=1;
       
        
    }
    else{
    cart.push({
        name,
        price,
        quantity: 1,

    })

    
    }   
    atualizaCarrinho()
    
}


function atualizaCarrinho(){
    cartItemsContainer.innerHTML = ""
    let total = 0;
    

    cart.forEach(item => {
       
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
        

        
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                   <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium">R$${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                   
                </div>
                
                    <button class="remove-btn" data-name="${item.name}">
                        Remover
                    </button>
               
            </div>        
        `
        total += item.price * item.quantity
        
        cartItemsContainer.appendChild(cartItemElement)
    })
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency :"BRL"
    });

    cartCounter.innerHTML = cart.length;


}

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")

        removerItem(name);
    }

})

function removerItem(name){
    const index = cart.findIndex(item => item.name === name)

    if(index!== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity -=1;
            atualizaCarrinho();
            return
        }

        cart.splice(index, 1);
        atualizaCarrinho();
    }
}


addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value
    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
        return
    }
})


checkoutBtn.addEventListener("click", function(){
    if (cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
    }
    else {
        addressWarn.classList.add("hidden");
        addressInput.classList.remove("border-red-500");
        console.log("Chamando exibirQRCode...");
         exibirQRCode();
    }
    
})