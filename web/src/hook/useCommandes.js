import { useState, useEffect } from "react";
import axios from "axios";

export function useCommandes() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}commandes.json`).then((reponse) => {
      const resultat = [];
      for (const key in reponse.data) {
        if (reponse.data[key]) resultat.push({ ...reponse.data[key], id: key });
      }
      setCommandes(resultat);
    });
  }, []);

  const handleCancelOrder = async (orderId, commande) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API}commandes/${orderId}.json`, { ...commande, status: 'ANNULÉE' });
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturn = async (productId, quantity, commande, orderId) => {
    const confirmReturn = window.confirm('Êtes-vous sûr de vouloir retourner ce produit ?');

    if (!confirmReturn) {
      return;
    }

    let newCommande = { ...commande };
    newCommande.cartItems.cart.forEach((item) => {
      if (item.id === productId) {
        item.quantityInCart -= quantity;
      }
    });

    await axios.put(`${import.meta.env.VITE_API}commandes/${orderId}.json`, newCommande);

    const productResponse = await axios.get(`${import.meta.env.VITE_API}produits/${productId}.json`);
    let productData = productResponse.data;
    productData.stock += quantity;
    await axios.put(`${import.meta.env.VITE_API}produits/${productId}.json`, productData);

    window.location.reload();
  };

  const updateQuantityInOrder = async (productId, newQuantity, commande, orderId) => {
    let itemInOrder;
    const newCartItems = commande.cartItems.cart.map((item) => {
      if (item.product_id === productId) {
        itemInOrder = item;
        return { ...item, quantityInCart: newQuantity };
      } else {
        return item;
      }
    });

    if (!itemInOrder) {
      console.error(`Le produit avec l'id ${productId} n'a pas été trouvé dans la commande.`);
      return;
    }

    const quantityDifference = itemInOrder.quantityInCart - newQuantity;
    const newCommande = { ...commande, cartItems: { ...commande.cartItems, cart: newCartItems } };

    try {
      await axios.put(`${import.meta.env.VITE_API}commandes/${orderId}.json`, newCommande);

      const productsResponse = await axios.get(`${import.meta.env.VITE_API}produits.json`);
      const products = productsResponse.data;

      for (const key in products) {
        if (products[key].product_id === productId) {
          const updatedProduct = { ...products[key], quantity: products[key].quantity + quantityDifference };
          await axios.put(`${import.meta.env.VITE_API}produits/${key}.json`, updatedProduct);
          break;
        }
      }

      const updatedCommandes = commandes.map((commande) => {
        if (commande.id === orderId) {
          return { ...commande, cartItems: { ...commande.cartItems, total: calculateTotalPrice(newCartItems) } };
        } else {
          return commande;
        }
      });
      setCommandes(updatedCommandes);
      console.log("TEST")

    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantityInCart, 0);
  };

  return [commandes, handleCancelOrder, updateQuantityInOrder, handleReturn];
}
