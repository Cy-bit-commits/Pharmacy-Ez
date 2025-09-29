"use client";
import React, { createContext, useContext, useState } from 'react';

// Cart context type
type CartItem = {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price?: number;
  pharmacyId: string;
  pharmacyName: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.pharmacyId === item.pharmacyId);
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.pharmacyId === item.pharmacyId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev => prev.map(i => (i.id === id ? { ...i, quantity } : i)));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
