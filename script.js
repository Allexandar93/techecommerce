const productList = document.querySelector(".product-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total-value");
const cartCount = document.querySelector(".cartCountInfo");
const featuredList = document.querySelector(".featuredList");
const typeList = document.querySelector(".typeList");
const hearList = document.querySelector(".hearList");
const buyBtn = document.querySelectorAll(".buy-btn");

let cartItemID = 1;

const eventListeners = () => {
  window.addEventListener("DOMContentLoaded", () => {
    loadFeaturedJSON();
    loadTypeJSON();
    loadHearJSON();
    loadJSON();
    loadCart();
  });

  productList.addEventListener("click", purchaseProduct);
};

const updateCartTotal = () => {
  let cartInfo = findCartInfo();
  cartTotal.textContent = cartInfo;
};

const loadJSON = () => {
  fetch("shop.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((product) => {
        html += `
        <div class="product text-center col-lg-3 col-md-4 col-12">
            <img class="img-fluid mb-3" src="${product.imgSrc}" alt="" />
            <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <h5 class="p-name">${product.name}</h5>
            <h4 class="p-price">$${product.price}</h4>
             <button class="buy-btn">BUY</button>
        </div>
            `;
      });
      productList.innerHTML = html;
    })
    .catch((err) => console.log(err));
};

const loadFeaturedJSON = () => {
  fetch("featured.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((product) => {
        html += `
        <a class="visitShop" href="shop.html" >
        <div class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" src="${product.imgSrc}" alt="" />
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <h5 class="p-name">${product.name}</h5>
          <h4 class="p-price">$${product.price}</h4>
          <a href="shop.html" ><button class="buy-btn">VIEW</button> </a>
        </div>
        </a>
            `;
      });
      featuredList.innerHTML = html;
    })
    .catch((err) => console.log(err));
};

const loadTypeJSON = () => {
  fetch("type.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((product) => {
        html += `
        <a class="visitShop" href="shop.html" >
        <div class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" src="${product.imgSrc}" alt="" />
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <h5 class="p-name">${product.name}</h5>
          <h4 class="p-price">$${product.price}</h4>
          <a href="shop.html" ><button class="buy-btn">VIEW</button> </a>
        </div>
        </a>
            `;
      });
      typeList.innerHTML = html;
    })
    .catch((err) => console.log(err));
};

const loadHearJSON = () => {
  fetch("hear.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((product) => {
        html += `
        <a class="visitShop" href="shop.html" >

        <div class="product text-center col-lg-3 col-md-4 col-12">
          <img class="img-fluid mb-3" src="${product.imgSrc}" alt="" />
          <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <h5 class="p-name">${product.name}</h5>
          <h4 class="p-price">$${product.price}</h4>
          <a href="shop.html" ><button class="buy-btn">VIEW</button> </a>
        </div>
        </a>
            `;
      });
      hearList.innerHTML = html;
    })
    .catch((err) => console.log(err));
};

const purchaseProduct = (e) => {
  if (e.target.classList.contains("buy-btn")) {
    let product = e.target.parentElement;
    getProductInfo(product);
  }
};

const getProductInfo = (product) => {
  let productInfo = {
    id: cartItemID,
    imgSrc: product.querySelector(".product img").src,
    name: product.querySelector(".p-name").textContent,
    price: product.querySelector(".p-price").textContent,
  };
  cartItemID++;
  saveProductInStorage(productInfo);
};

const addToCart = (product) => {
  const cartItem = document.createElement("tr");
  cartItem.setAttribute("data-id", `${product.id}`);

  cartItem.innerHTML = `
              <td><i class="fa-solid fa-trash"></i></td>
              <td data-id="${product.id}"><img src="${product.imgSrc}" alt="" /></td>
              <td><h5>${product.name}</h5></td>
            
              <td>${product.price} </td>
    `;

  cartList.appendChild(cartItem);
  updateCartTotal();
  cartList.addEventListener("click", deleteProduct);
};

const saveProductInStorage = (item) => {
  let products = getProductFromStorage();
  products.push(item);
  localStorage.setItem("products", JSON.stringify(products));
};

const getProductFromStorage = () => {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
};

const loadCart = () => {
  let products = getProductFromStorage();
  if (products.length < 1) {
    cartItemID = 1;
  } else {
    cartItemID = products[products.length - 1].id;
    cartItemID++;
  }
  products.forEach((product) => addToCart(product));
};

const findCartInfo = () => {
  let products = getProductFromStorage();
  let total = products.reduce((acc, product) => {
    let price = parseFloat(product.price.substr(1));
    return (acc += price);
  }, 0);

  return total.toFixed(2);
};

const deleteProduct = (e) => {
  let cartItem;
  if (e.target.tagName === "I") {
    cartItem = e.target.parentElement.parentElement;
    cartItem.remove();
  }
  let products = getProductFromStorage();
  let updatedProducts = products.filter((product) => {
    return product.id !== parseInt(cartItem.dataset.id);
  });

  localStorage.setItem("products", JSON.stringify(updatedProducts));
  updateCartTotal();
};

eventListeners();
