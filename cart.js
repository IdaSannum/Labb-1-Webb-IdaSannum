if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (const button of removeCartItemButtons) {
    button.addEventListener("click", removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (const input of quantityInputs) {
    input.addEventListener("change", quantityChanged);
  }

  const addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (const button of addToCartButtons) {
    button.addEventListener("click", addToCartClicked);
  }

  document
    .querySelector(".btn-purchase")
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  const cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  const button = event.target;
  const shopItem = button.parentElement.parentElement;
  const title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  const price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  const imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartItemNames = cartItems.getElementsByClassName("cart-item-title");

  for (const cartItemName of cartItemNames) {
    if (cartItemName.innerText == title) {
      alert("This item is alredy added to the cart");
      return;
    }
  }

  // Skapa element
  const cartItem = document.createElement("div");
  const cartImage = document.createElement("img");
  const cartItemTitle = document.createElement("span");
  const cartPrice = document.createElement("span");
  const cartQuantity = document.createElement("div");
  const cartQuantityInput = document.createElement("input");
  const cartRemoveButton = document.createElement("button");

  // Styla element
  cartItem.classList.add("cart-item", "cart-column");
  cartImage.classList.add("cart-item-image");
  cartItemTitle.classList.add("cart-item-title");
  cartPrice.classList.add("cart-price", "cart-column");
  cartQuantity.classList.add("cart-quantity", "cart-column");
  cartQuantityInput.classList.add("cart-quantity-input");
  cartRemoveButton.classList.add("btn", "btn-danger", "cart-quantity-button");

  // Innehåll i element
  cartImage.src = imageSrc;
  cartImage.alt = title;
  cartImage.height = 50;
  cartImage.width = 50;
  cartItemTitle.innerText = title;
  cartPrice.innerText = price;
  cartQuantityInput.type = "Number";
  cartQuantityInput.value = 1;
  cartRemoveButton.innerText = "REMOVE";

  // Lägg till elemenet i dom
  cartItem.append(cartImage, cartItemTitle);
  cartQuantity.append(cartQuantityInput, cartRemoveButton);
  cartRow.append(cartItem, cartPrice, cartQuantity);
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName("cart-items")[0];
  const cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  let totalQuantity = 0;

  for (const cartRow of cartRows) {
    const priceElement = cartRow.getElementsByClassName("cart-price")[0];
    const quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];

    const price = parseFloat(priceElement.innerText);
    const quantity = parseInt(quantityElement.value);
    total += price * quantity;
    totalQuantity += quantity;
  }

  document.getElementsByClassName("cart-total-price")[0].innerText = total;
  document.querySelector("#countProducts").innerText = totalQuantity;
}
