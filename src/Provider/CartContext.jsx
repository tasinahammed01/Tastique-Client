import React, { createContext, useContext, useState, useEffect } from "react";
import {
  addToCart as addToCartLS,
  getCart,
  removeFromCart as removeFromCartLS,
  updateCartItem as updateCartItemLS,
  clearCart as clearCartLS,
} from "../utils/localStorage";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart on mount
  useEffect(() => {
    const savedCart = getCart();
    setCart(savedCart);
  }, []);

  // Update cartCount whenever cart changes
  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  }, [cart]);

  // Add item
  const addToCart = (item) => {
    const updatedCart = addToCartLS(item);
    setCart(updatedCart);
    return updatedCart;
  };

  // Remove item
  const removeFromCart = (itemId) => {
    const updatedCart = removeFromCartLS(itemId);
    setCart(updatedCart);
    return updatedCart;
  };

  // Update quantity
  const updateCartItem = (itemId, quantity) => {
    const updatedCart = updateCartItemLS(itemId, quantity);
    setCart(updatedCart);
    return updatedCart;
  };

  // Clear cart
  const clearCart = () => {
    const clearedCart = clearCartLS();
    setCart(clearedCart);
    return clearedCart;
  };

  const value = {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
