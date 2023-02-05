const products = [
  {
    name: 'Tårta 1',
    image: 'Images/cake1.png',
    price: 300
  },
  {
    name: 'Tårta 2',
    image: 'Images/cake2.png',
    price: 400
  },
];

console.log('Mina produkter', products);

for (let i = 0; i < products.length; i++) {
    console.log(products[i].name, products[i]);
}

/*<div class="card col-md">
              <img class="card-img-top" src="Images/cake1.png" alt="Cake 1" />
              <div class="card-body">
                <h4 class="card-title">Tårta 1</h4>
                <span>300 kr</span>
                <button class="btn btn-info">Lägg till i kundvagn</button>
              </div>
            </div>*/
