    const products = [
    { name: "T-Shirt", price: 499, image: "https://images.unsplash.com/photo-1618354691458-3e8c1cf0eb17?auto=format&fit=crop&w=500&q=80" },
    { name: "Sneakers", price: 1999, image: "https://via.placeholder.com/150" },
    { name: "Watch", price: 1499, image: "https://via.placeholder.com/150" },
    { name: "Backpack", price: 899, image: "https://via.placeholder.com/150" }
    ];

    let cart = [];

    function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>Price: ₹${product.price}</p>
        <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
    }

    function addToCart(index) {
    const item = products[index];
    const existing = cart.find(p => p.name === item.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    showPopup(`${item.name} added to cart`);
    renderCart();
    }

    function increaseQty(index) {
    cart[index].quantity += 1;
    renderCart();
    }

    function decreaseQty(index) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    renderCart();
    }

    function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total");
    const cartContainer = document.getElementById("cart-container");

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.classList.remove("active");
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement("li");
        li.innerHTML = `
        ${item.name} - ₹${itemTotal}
        <button onclick="decreaseQty(${index})">-</button>
        <span>x${item.quantity}</span>
        <button onclick="increaseQty(${index})">+</button>
        `;
        cartItems.appendChild(li);
    });

    totalDisplay.textContent = total;
    }

    function toggleCart() {
    const cart = document.getElementById("cart-container");
    cart.classList.toggle("active");
    }

    function showPopup(message) {
    const popup = document.createElement("div");
    popup.textContent = message;

    Object.assign(popup.style, {
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#4caf50",
        color: "white",
        padding: "10px 20px",
        borderRadius: "6px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: "999",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px"
    });

    // const icon = document.createElement("span");
    // icon.textContent = "✅";
    // popup.prepend(icon);

    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 2000);
    }

    // Init
    document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    });
