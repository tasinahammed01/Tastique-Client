const CART_KEY = "cart";

// Get cart
export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Save cart
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};


// Add item
export const addToCart = (item) => {
  const cart = getCart();
  const existingItem = cart.find((i) => i.id === item._id); // Use `_id` from the API response

  if (existingItem) {
    existingItem.quantity += item.quantity || 1; // Increase quantity if item exists
  } else {
    cart.push({ ...item, id: item._id, quantity: item.quantity || 1 }); // Push the item with the correct `id` as `_id`
  }

  return saveCart(cart);
};

// Update item quantity
export const updateCartItem = (id, quantity) => {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) item.quantity = quantity;
  return saveCart(cart);
};

// Remove item
export const removeFromCart = (id) => {
  const cart = getCart().filter((i) => i.id !== id);
  return saveCart(cart);
};

// Clear cart
export const clearCart = () => saveCart([]);
