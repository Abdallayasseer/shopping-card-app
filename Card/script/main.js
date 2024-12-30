const opinShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const body = document.querySelector("body");
const total = document.querySelector(".total");
const quantity = document.querySelector(".quantity");
const listCard = document.querySelector(".listCard");

// Product Data
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    img: "../Images/pexels-ash-craig-122861-376464.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    img: "../Images/pexels-ella-olsson-572949-1640777.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    img: "../Images/pexels-janetrangdoan-1099680.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 400,
    img: "../Images/pexels-robinstickel-70497.jpg",
  },
  {
    id: 5,
    name: "Product 5",
    price: 500,
    img: "../Images/pexels-vanmalidate-769289.jpg",
  },
  {
    id: 6,
    name: "Product 6",
    price: 600,
    img: "../Images/pexels-fotios-photos-1279330.jpg",
  },
];

// Shopping Cart
let cart = [];

// Initialize Application
function initApp() {
  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-4");
    productCard.innerHTML = `
      <div class="card">
        <div class="card-img">
          <img src="${product.img}" class="img-fluid" alt="Product Image">
        </div>
        <div class="card-body">
          <div class="card-title">
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <button class="btnAdd btn btn-primary" data-key="${index}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    list.appendChild(productCard);
  });

  // Event delegation for "Add to Cart" buttons
  list.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnAdd")) {
      const key = parseInt(event.target.getAttribute("data-key"));
      addProduct(key);
    }
  });
}

// Add Product to Cart
function addProduct(key) {
  if (!cart[key]) {
    cart[key] = { ...products[key], quantity: 1 };
  } else {
    cart[key].quantity++;
  }
  updateCart();
}

// Update Shopping Cart
function updateCart() {
  listCard.innerHTML = "";
  let totalPrice = 0;
  let totalQuantity = 0;

  cart.forEach((item, index) => {
    if (item) {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;

      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
        <div><img src="${item.img}" alt="Product Image"></div>
        <div class="productDetails">
          <div>${item.name}</div>
          <div>Price: $${item.price}</div>
          <div>Quantity: ${item.quantity}</div>
        </div>
        <div class="count-btn">
          <button class="btn" data-key="${index}" data-action="decrease">-</button>
          <div class="count">${item.quantity}</div>
          <button class="btn" data-key="${index}" data-action="increase">+</button>
        </div>
      `;
      listCard.appendChild(cartItem);
    }
  });

  total.textContent = `Total Price: $${totalPrice}`;
  quantity.textContent = totalQuantity;

  // Update event delegation for quantity buttons
  listCard.addEventListener("click", handleQuantityChange);
}

// Handle Quantity Changes
function handleQuantityChange(event) {
  const key = parseInt(event.target.getAttribute("data-key"));
  const action = event.target.getAttribute("data-action");

  if (action === "decrease") {
    changeQuantity(key, cart[key].quantity - 1);
  } else if (action === "increase") {
    changeQuantity(key, cart[key].quantity + 1);
  }
}

// Change Quantity of a Product
function changeQuantity(key, value) {
  if (value < 1) {
    delete cart[key];
  } else {
    cart[key].quantity = value;
  }
  updateCart();
}

// Toggle Shopping Cart Visibility
opinShopping.addEventListener("click", () => body.classList.toggle("active"));
closeShopping.addEventListener("click", () => body.classList.remove("active"));

initApp();
