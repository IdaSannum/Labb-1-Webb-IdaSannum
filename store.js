class Product {
  constructor(name, image, price) {
    this.name = name;
    this.image = image;
    this.price = price;
  }
}

const productList = document.querySelector("#products");
const countProductsDisplay = document.querySelector("#countProducts");
let countProducts = 0;

const products = [
  {
    name: "Tårta 1",
    image: "Images/cake1.png",
    price: 300,
  },
  {
    name: "Tårta 2",
    image: "Images/cake2.png",
    price: 400,
  },
  {
    name: "Tårta 3",
    image: "Images/cake3.png",
    price: 350,
  },
  {
    name: "Tårta 4",
    image: "Images/cake4.png",
    price: 400,
  },
  {
    name: "Tårta 5",
    image: "Images/cake5.png",
    price: 300,
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
  moreInfoButton.classList.add("btn", "btn-secondary", "mx-3");

  // Innehåll i element
  cardTitle.innerText = product.name;
  cardImage.src = product.image;
  cardImage.alt = product.name;
  cardPrice.innerText = product.price;
  addToCartButton.innerText = "Add To Cart";
  moreInfoButton.innerText = "More Info";

  // Sätta event på element

  addToCartButton.onclick = () => {
    // Lägg till produkten i kundvagnen

    // if(lista > 0) {
    //   // Lägg till produkt i listan
    // }
    // else {
    //   // skapa en ny lista
    // }

    // Plus 1 i antal produkter i kundvagnen
    countProducts++;
    countProductsDisplay.innerText = countProducts;
  };

  // moreInfoButton.onclick () => {

  // };

  // Lägg till element i dom
  cardHeader.append(cardTitle);
  cardBody.append(cardImage);
  cardFooter.append(cardPrice, addToCartButton, moreInfoButton);
  card.append(cardHeader, cardBody, cardFooter);
  productList.append(card);
}

// const html = `<div class="card col-md">
//               <img class="card-img-top" src=${product.image} alt="Cake 1" />
//               <div class="card-body">
//                 <h4 class="card-title">${product.name}</h4>
//                 <span>${product.price} kr</span>
//                 <button class="btn btn-info">Lägg till i kundvagn</button>
//               </div>
//             </div>`;
//   productList.innerHTML += html;

