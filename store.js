const productList = document.querySelector("#products");

const products = [
  {
    id: 1,
    name: "Cake 1",
    image: "Images/cake1.png",
    price: 300,
    moreInfo: "Mer information om tårta 1",
  },
  {
    id: 2,
    name: "Cake 2",
    image: "Images/cake2.png",
    price: 400,
    moreInfo: "Mer information om tårta 2",
  },
  {
    id: 3,
    name: "Cake 3",
    image: "Images/cake3.png",
    price: 350,
    moreInfo: "Mer information om tårta 3",
  },
  {
    id: 4,
    name: "Cake 4",
    image: "Images/cake4.png",
    price: 400,
    moreInfo: "Mer information om tårta 4",
  },
  {
    id: 5,
    name: "Cake 5",
    image: "Images/cake5.png",
    price: 300,
    moreInfo: "Mer information om tårta 5",
  },
];

for (const product of products) {
  // Skapa element
  const card = document.createElement("li");
  const cardHeader = document.createElement("div");
  const cardTitle = document.createElement("h4");
  const cardBody = document.createElement("div");
  const cardImage = document.createElement("img");
  const cardFooter = document.createElement("div");
  const cardPrice = document.createElement("span");
  const addToCartButton = document.createElement("button");
  const moreInfoButton = document.createElement("button");

  // Styla element
  card.classList.add("card", "col-md", "shop-items");
  cardHeader.classList.add("card-header", "fw-bold", "shop-item");
  cardTitle.classList.add("card-title", "shop-item-title");
  cardBody.classList.add("card-body");
  cardImage.classList.add("card-img-top", "shop-item-image");
  cardFooter.classList.add("card-footer", "shop-item-details");
  cardPrice.classList.add("shop-item-price");
  addToCartButton.classList.add("btn", "btn-info", "mx-3", "shop-item-button");
  moreInfoButton.classList.add(
    "btn",
    "btn-secondary",
    "mx-3",
    "shop-item-more-info"
  );

  // Innehåll i element
  cardTitle.innerText = product.name;
  cardImage.src = product.image;
  cardImage.alt = product.name;
  cardPrice.innerText = product.price;
  addToCartButton.innerText = "Add To Cart";
  moreInfoButton.innerText = "More Info";
  moreInfoButton.setAttribute("data-bs-toggle", "modal");
  moreInfoButton.setAttribute("data-bs-target", "#more-info-modal");
  moreInfoButton.setAttribute("data-shop-item-id", product.id);

  // Lägg till element i dom
  cardHeader.append(cardTitle);
  cardBody.append(cardImage);
  cardFooter.append(cardPrice, addToCartButton, moreInfoButton);
  card.append(cardHeader, cardBody, cardFooter);
  productList.append(card);
}

loadCart();

var moreInfoButtons = document.getElementsByClassName("shop-item-more-info");
for (const button of moreInfoButtons) {
  button.addEventListener("click", moreInfoClicked);
}

function moreInfoClicked(event) {
  const button = event.target;
  const itemId = parseInt(button.getAttribute("data-shop-item-id"));
  const shopItem = products.find((p) => p.id === itemId);

  const imageElement = document.getElementById("more-info-item-image");
  const titleElement = document.getElementById("more-info-item-title");
  const moreInfoElement = document.getElementById("more-info-item-text");

  titleElement.innerText = shopItem.name;
  imageElement.src = shopItem.image;
  imageElement.alt = shopItem.name;
  moreInfoElement.innerText = shopItem.moreInfo;
}

function loadCart() {
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
