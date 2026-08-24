import React, { createContext, useContext, useState } from 'react';

// Тип товара в корзине
export interface CartItem {
  id: number;
  name: string;
  photo: string;
  size: string;        // "20 кусков", "30 кусков", "40 кусков"
  filling: string;     // Начинка
  cakeText: string;    // Текст на торте
  price: number;       // Итоговая цена
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string, filling: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      // Проверяем, есть ли такой же товар
      const existingIndex = prev.findIndex(
        i => i.id === item.id && i.size === item.size && i.filling === item.filling
      );
      
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, size: string, filling: string) => {
    setItems(prev => prev.filter(
      i => !(i.id === id && i.size === size && i.filling === filling)
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};