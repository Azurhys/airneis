import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);

  useEffect(() => {
    const getCart = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('cart')
        setCart(jsonValue != null ? JSON.parse(jsonValue) : []);
      } catch(e) {
        // read error
        console.error(e);
      }
    }

    getCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        const jsonValue = JSON.stringify(cart)
        await AsyncStorage.setItem('cart', jsonValue)
      } catch (e) {
        // saving error
        console.error(e);
      }
    }

    saveCart();
  }, [cart]);

  const startCheckout = () => {
    setCheckoutInProgress(true);
  };

  const completeCheckout = () => {
    setCheckoutInProgress(false);
  };

  function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantityInCart: item.quantityInCart + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantityInCart: 1 }]);
    }
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart => {
      return prevCart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantityInCart: Math.min(quantity, product.quantity),
          }
        }
        return product;
      });
    });
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
  };

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{
      cart, addToCart, updateQuantity, removeFromCart, checkoutInProgress,
      startCheckout, completeCheckout, clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
