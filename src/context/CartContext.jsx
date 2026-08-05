import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  const handleAddToCart = (product, size, color, qty = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor?.name === color?.name
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += qty;
        return copy;
      } else {
        return [
          ...prev,
          {
            ...product,
            selectedSize: size || product.sizes[0],
            selectedColor: color || product.colors[0],
            quantity: qty
          }
        ];
      }
    });
  };

  const handleUpdateQuantity = (idx, newQty) => {
    setCartItems((prev) => {
      const copy = [...prev];
      copy[idx].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (idx) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, handleAddToCart, handleUpdateQuantity, handleRemoveItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
