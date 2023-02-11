// class Product {
//   constructor(name, image, price, moreInfo) {
//     this.name = name;
//     this.image = image;
//     this.price = price;
//     this.moreInfo = moreInfo;
//   }
// }

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

var moreInfoButtons = document.getElementsByClassName("shop-item-more-info");
for (const button of moreInfoButtons) {
  button.addEventListener("click", moreInfoClicked);
}

function moreInfoClicked(event) {
  const button = event.target;
  const itemId = parseInt(button.getAttribute("data-shop-item-id"));
  const shopItem = products.find(p => p.id === itemId);
  
  const imageElement = document.getElementById("more-info-item-image");
  const titleElement = document.getElementById("more-info-item-title");
  const moreInfoElement = document.getElementById("more-info-item-text");

  titleElement.innerText = shopItem.name;
  imageElement.src = shopItem.image;
  imageElement.alt = shopItem.name;
  moreInfoElement.innerText = shopItem.moreInfo;

}
