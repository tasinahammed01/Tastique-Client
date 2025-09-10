// localstore.js
const CART_KEY = "cart";

// Get cart from localStorage
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

// Add item to cart
export const addToCart = (item) => {
  const cart = getCart();

  // Check if item already exists
  const existingItem = cart.find((i) => i.id === item.id);
  if (existingItem) {
    existingItem.quantity += item.quantity || 1;
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

// Remove item from cart
export const removeFromCart = (itemId) => {
  const cart = getCart().filter((item) => item.id !== itemId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

// Update item quantity
export const updateCartItem = (itemId, quantity) => {
  const cart = getCart().map((item) => {
    if (item.id === itemId) {
      return { ...item, quantity };
    }
    return item;
  });
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

// Clear entire cart
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  return [];
};
