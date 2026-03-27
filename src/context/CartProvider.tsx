import { useEffect, useState } from "react";
import { CartContext, type CartItem } from "./CartContext";
import type { Product } from "../types/product";

const STORAGE_KEY = "cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exist = prev.find(i => i.product._id === product._id);

      if (exist) {
        return prev.map(i =>
          i.product._id === product._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.product._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prev =>
      prev.map(i =>
        i.product._id === id ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};