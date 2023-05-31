import { createContext , useState } from "react"
import React from "react";

export const cartContext = React.createContext();

export function CartContextProvider({children}) {
    const [cart, setCart] = useState(() => {
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : [];
    });
    const [checkoutInProgress, setCheckoutInProgress] = useState(false);

    

    const startCheckout = () => {
        setCheckoutInProgress(true);
    };

    const completeCheckout = () => {
        setCheckoutInProgress(false);
    };

  function addToCart(product){
    // Vérifie si le produit est déjà dans le panier
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // Si le produit est déjà dans le panier, incrémente la quantité dans le panier
        setCart(cart.map(item => 
            item.id === product.id 
                ? {...item, quantityInCart: item.quantityInCart + 1} 
                : item
        ));
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        // Si le produit n'est pas encore dans le panier, ajoute-le avec quantityInCart égale à 1
        setCart([...cart, {...product, quantityInCart: 1}]);
        localStorage.setItem('cart', JSON.stringify(cart));
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
        console.log("Removing product with id:", productId);
        const newCart = cart.filter(item => item.id !== productId);
        console.log("New cart:", newCart);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };
    
    
  function clearCart() {
    setCart([]);
  }

  return (
    <cartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, checkoutInProgress, startCheckout, 
      completeCheckout, clearCart }}>
      {children}
    </cartContext.Provider>
  );
}



export default CartContextProvider ;

