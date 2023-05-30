import { createContext , useState } from "react"
import React from "react";

export const cartContext = React.createContext();

export function CartContextProvider({children}) {
  const [cart, setCart] = useState([]);

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
    } else {
        // Si le produit n'est pas encore dans le panier, ajoute-le avec quantityInCart égale à 1
        setCart([...cart, {...product, quantityInCart: 1}]);
    }
    };


  function removeFromCart(item) {
    setCart(cart.filter(i => i !== item));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <cartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
      {children}
    </cartContext.Provider>
  );
}



export default CartContextProvider ;

// value={{a: 1, b : 2}}
// const value = {a: 1, b : 2}