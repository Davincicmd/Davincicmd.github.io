// Define menu items
const menuItems = [
	{ id: 1, name: "Pasta", price: 45.99 },
	{ id: 2, name: "Pizza", price: 75.99 },
	{ id: 3, name: "Burger", price: 25.99 },
	{ id: 4, name: "Salad", price: 14.99 },
	{ id: 5, name: "Steak", price: 80.99 },
	{ id: 6, name: "Fish and Chips", price: 45.99 },
	{ id: 7, name: "Chicken Curry", price: 55.99 },
	{ id: 8, name: "Visashi", price: 9.99 },
	{ id: 9, name: "kandolo", price: 15.99 },
	{ id: 10, name: "Goat Meat", price: 15.99 },
];

// Get menu list element
const menuList = document.getElementById("menu-list");

// Create menu items
let menuItemsHTML = "";

menuItems.forEach(item => {
	menuItemsHTML += `
		<li>
			<h3>${item.name}</h3>
			<p>${item.price.toFixed(2)}</p>
			<button onclick="addToCart(${item.id})">Add to Cart</button>
		</li>
	`;
});

// Add menu items HTML to menu list element
menuList.innerHTML = menuItemsHTML;

// Define cart items array
let cartItems = [];

// Get cart items list element
const cartItemsList = document.getElementById("cart-items");

// Create cart item HTML
function createCartItemHTML(item) {
	return `
				<li>
					<span>${item.name}</span>
					<span>${item.quantity}</span>
					<span>$${item.total.toFixed(2)}</span>
					<button onclick="removeFromCart(${item.id})">Remove</button>
				</li>
			`;
}

// Render cart items
function renderCart() {
	// Create cart items HTML
	let cartItemsHTML = "";

	cartItems.forEach(item => {
		cartItemsHTML += createCartItemHTML(item);
	});

	// Add cart items HTML to cart items list element
	cartItemsList.innerHTML = cartItemsHTML;

	// Update cart total
	const cartTotal = document.getElementById("cart-total");
	const total = cartItems.reduce((acc, item) => acc + item.total, 0);
	cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Add item to cart
function addToCart(id) {
	// Check if item is already in cart
	const itemInCart = cartItems.find(item => item.id === id);

	// If item is already in cart, increase its quantity and update its total
	if (itemInCart) {
		itemInCart.quantity++;
		itemInCart.total = itemInCart.quantity * itemInCart.price;
	} else {
		// If item is not in cart, add it to cart
		const menuItem = menuItems.find(item => item.id === id);
		const cartItem = {
			id: menuItem.id,
			name: menuItem.name,
			price: menuItem.price,
			quantity: 1,
			total: menuItem.price,
		};
		cartItems.push(cartItem);
	}

	// Render cart
	renderCart();
}

// Remove item from cart
// Remove item from cart
function removeFromCart(id) {
	// Get index of item in cart
	const itemIndex = cartItems.findIndex(item => item.id === id);

	// If item is found in cart, remove it
	if (itemIndex !== -1) {
		cartItems.splice(itemIndex, 1);
	}

	// Render cart
	renderCart();
}

