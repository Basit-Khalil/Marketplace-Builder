'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';

// Define the CartItem interface where id is a string
interface CartItem {
  id: string; // ID is a string (as it comes from Sanity or another source)
  image: string | StaticImageData;
  productName: string;
  description?: string; 
    quantity: number;
  price: number;
}

// Define the CartContext type, making sure to use string for id
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void; // Expecting string id here
  updateQuantity: (id: string, type: 'increase' | 'decrease') => void; // String id here as well
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        const hydratedCart = parsedCart.map((item: CartItem) => ({
          ...item,
          image: item.image, // Make sure image is being treated as string
        }));
        setItems(hydratedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  useEffect(() => {
    try {
      const cartToSave = items.map(item => ({
        ...item,
        image: typeof item.image === 'string' ? item.image : item.image.src, // Ensure image is string
      }));
      localStorage.setItem('cart', JSON.stringify(cartToSave));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, newItem];
    });
  };

  const updateQuantity = (id: string, type: 'increase' | 'decrease') => {
    setItems(currentItems =>
      currentItems
        .map(item => {
          if (item.id === id) {
            const newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
            if (newQuantity === 0) {
              return null; // Return null if quantity reaches 0
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean) as CartItem[] // Filter out nulls
    );
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
