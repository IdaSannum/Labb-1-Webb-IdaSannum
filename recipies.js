class Product {
  constructor(name, image, category) {
    this.name = name;
    this.image = image;
    this.category = category;
  }
}

const response = await fetch(
  "https://www.themealdb.com/api/json/v1/1/search.php?s=chocolate"
);
var searchResult = await response.json();

const products = searchResult.meals.map(
  (meal) => new Product(meal.strMeal, meal.strMealThumb, meal.strCategory)
);

const productList = document.querySelector("#products");

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

  // Styla element
  card.classList.add("card", "col-md");
  cardHeader.classList.add("card-header", "fw-bold");
  cardTitle.classList.add("card-title");
  cardBody.classList.add("card-body");
  cardImage.classList.add("card-img-top");
  cardFooter.classList.add("card-footer");
  addToCartButton.classList.add("btn", "btn-info", "mx-3");

  // Innehåll i element
  cardTitle.innerText = product.name;
  cardImage.src = product.image;
  cardImage.alt = product.name;
  cardPrice.innerText = product.category;
  addToCartButton.innerText = "Add To Cart";

  // Sätta event på element

  // Lägg till element i dom
  cardHeader.append(cardTitle);
  cardBody.append(cardImage);
  cardFooter.append(cardPrice, addToCartButton);
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
