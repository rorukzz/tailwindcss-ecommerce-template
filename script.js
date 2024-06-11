// JavaScript code to toggle the cart dropdown
const cartButton = document.getElementById('cart-button');
const cartDropdown = document.getElementById('cart-dropdown');
const cartCount = document.getElementById('cart-count');

let cartItems = [];
let cartTotal = 0;

document.addEventListener('click', (event) => {
    const isClickInside = cartButton.contains(event.target) || cartDropdown.contains(event.target);
    if (!isClickInside) {
        cartDropdown.style.display = 'none';
    }
});

cartButton.addEventListener('click', (event) => {
    event.stopPropagation();
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

// Function to add item to cart
function addToCart(itemName, itemPrice, itemThumbnail) {
    const existingItemIndex = cartItems.findIndex(item => item.name === itemName);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += 1;
        cartItems[existingItemIndex].totalPrice += itemPrice;
    } else {
        cartItems.push({ name: itemName, price: itemPrice, thumbnail: itemThumbnail, quantity: 1, totalPrice: itemPrice });
    }
    cartTotal += itemPrice;
    updateCart();
}

// Function to update cart HTML
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-value');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    // Clear previous cart items
    cartItemsElement.innerHTML = '';

    if (cartItems.length === 0) {
        emptyCartMessage.classList.remove('hidden');
    } else {
        emptyCartMessage.classList.add('hidden');

        // Add current cart items
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.totalPrice.toFixed(2)}</p>
                    <p class="item-quantity">Quantity: ${item.quantity}</p>
                </div>
                <button class="item-remove" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsElement.appendChild(li);
        });
    }

    // Update total
    cartTotalElement.textContent = cartTotal.toFixed(2);

    // Update cart count
    cartCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

// Function to remove item from cart
function removeFromCart(index) {
    cartTotal -= cartItems[index].totalPrice;
    cartItems.splice(index, 1);
    updateCart();
}

// Function to handle checkout
function handleCheckout() {
    const checkoutLink = document.querySelector('.bg-blue-600');
    checkoutLink.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartTotal', cartTotal.toFixed(2));
        window.location.href = 'checkout.html';
    });
}

handleCheckout();
