

//switvhing between page and cart page

const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const target = tab.dataset.section;
    tabContents.forEach(tc => {
      tc.classList.toggle('active', tc.id === target);
    });
  });
});

//phone categories switch

function filterPhones(category) {
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    if (category === "all") {
      product.style.display = "block";
    } else {
      if (product.dataset.category === category) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    }
  });
}


function toggleMenu() {
  document.getElementById("nav").classList.toggle("show");
  if (document.getElementById("nav").classList.contains("show")) {

    const menuToggle = document.getElementById("menuToggle");
    menuToggle.textContent = "×";
  } else {
    menuToggle.textContent = "☰";
  };
};

// === for cart === //

let cart = [];
let total = 0;
let totalN = 0;

document.querySelectorAll(".cart-btn").forEach(button => {
  button.addEventListener("click", function() {
    const product = this.parentElement;
    const name = product.querySelector("h3").innerText;
    const price = parseInt(product.querySelector("p").innerText.replace("₦", "").replace(/,/g, ""));

    cart.push({name, price});
    total += price;
    totalN += price;

    updateCart();
  });
});

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ₦${item.price}
      <button onclick="removeItem(${index})">✖️</button>
    `;

    cartItems.appendChild(li);
  });

  // total price
  document.getElementById("total").innerText = "Total: ₦" + total;

  // cart count (header)
  document.getElementById("cartCount").innerText = cart.length;

}

  if (cart.length === 0) {
  cartItems.innerHTML = "<h3>Your cart is empty, please add item to cart.</h3>";
}


function checkout() {

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "Hello, I want to order:\n\n";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} - ₦${item.price.toLocaleString()}\n`;
  });

  message += `\nTotal: ₦${total.toLocaleString()}`;

  let phone = "2349168671007"; // 

  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}


function removeItem(index) {
  total -= cart[index].price; // subtract price
  cart.splice(index, 1); // remove item

  updateCart();
}


