if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready()
  }
  
  function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
  
    for(var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem) 
    }
  
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
  }

  function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
  }
  
  function removeCartItem(event) {
    var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
  }
  
  function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
      input.value = 1
    }
    updateCartTotal()
  }

  function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
  }

  function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert('This item is alredy added to the cart')
            return
        }
    }
    

    // Skapa element
    const cartItem = document.createElement('div')
    const cartImage = document.createElement('img')
    const cartItemTitle = document.createElement('span')
    const cartPrice = document.createElement('span')
    const cartQuantity = document.createElement('div')
    const cartQuantityInput = document.createElement('input')
    const cartRemoveButton = document.createElement('button')

    // Styla element
    cartItem.classList.add('cart-item', 'cart-column')
    cartImage.classList.add('cart-item-image')
    cartItemTitle.classList.add('cart-item-title')
    cartPrice.classList.add('cart-price', 'cart-column')
    cartQuantity.classList.add('cart-quantity', 'cart-column')
    cartQuantityInput.classList.add('cart-quantity-input')
    cartRemoveButton.classList.add('btn', 'btn-danger', 'cart-quantity-button')

    // Innehåll i element
    cartImage.src = imageSrc
    cartImage.alt = title
    cartImage.height = 50
    cartImage.width = 50
    cartItemTitle.innerText = title
    cartPrice.innerText = price
    cartQuantityInput.type = 'Number'
    cartQuantityInput.value = 1
    cartRemoveButton.innerText = 'REMOVE'

    // Lägg till elemenet i dom
    cartItem.append(cartImage, cartItemTitle)
    cartQuantity.append(cartQuantityInput,cartRemoveButton)
    cartRow.append(cartItem, cartPrice, cartQuantity)
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

    // addToCartButton.onclick = () => {
  //   // Lägg till produkten i kundvagnen

  //   // if(lista > 0) {
  //   //   // Lägg till produkt i listan
  //   // }
  //   // else {
  //   //   // skapa en ny lista
  //   // }

  //   // Plus 1 i antal produkter i kundvagnen
  //   countProducts++;
  //   countProductsDisplay.innerText = countProducts;
  // };
  }
  
  
  function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.innerText)
      var quantity = quantityElement.value
      total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = total
  }