// Cart localStorage utilities
const CART_KEY = "cart";

// Get cart
export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

// Save cart
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

// Add item to cart
export const addToCart = (item) => {
  const cart = getCart();
  const normalizedId = item.id || item._id;
  const existingItem = cart.find((i) => i.id === normalizedId);

  if (existingItem) {
    existingItem.quantity += item.quantity || 1;
  } else {
    cart.push({
      ...item,
      id: normalizedId,
      quantity: item.quantity || 1,
    });
  }

  return saveCart(cart);
};

// Update item quantity
export const updateCartItem = (id, quantity) => {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity = quantity;
  }
  return saveCart(cart);
};

// Remove item
export const removeFromCart = (id) => {
  const updatedCart = getCart().filter((i) => i.id !== id);
  return saveCart(updatedCart);
};

// Clear cart
export const clearCart = () => saveCart([]);

// Bookmark utilities (shared key across app)
const BOOKMARK_KEY = "bookmarkedFoods";

export const getBookmarks = () => {
  try {
    const data = localStorage.getItem(BOOKMARK_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveBookmarks = (bookmarks) => {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
  return bookmarks;
};

export const isBookmarked = (bookmarks, foodId) =>
  bookmarks.some((item) => (item.id || item._id) === foodId);

export const toggleBookmark = (bookmarks, food) => {
  const id = food.id || food._id;
  const exists = bookmarks.some((b) => (b.id || b._id) === id);
  const updated = exists
    ? bookmarks.filter((b) => (b.id || b._id) !== id)
    : [...bookmarks, { ...food }];
  return saveBookmarks(updated);
};


