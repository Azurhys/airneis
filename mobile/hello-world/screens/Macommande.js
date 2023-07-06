import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, SafeAreaView } from 'react-native';
//import { useParams } from 'react-router-dom';
import { useCommandes } from '../hook/useCommandes';
import { VITE_API } from "@env";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import styles from '../styles';

const MaCommande = () => {
  const route = useRoute();
  const { orderId } = route.params;

  const [commandes] = useCommandes();
  const commande = commandes.find((commande) => commande.orderId === orderId);

  const [tempQuantities, setTempQuantities] = useState({});

  const handleQuantityChange = (productId, newQuantity) => {
    setTempQuantities({ ...tempQuantities, [productId]: newQuantity });
  };

  const handleReturnProduct = (productId) => {
    updateQuantityInOrder(productId, tempQuantities[productId]);
  };

  if (!commande) {
    return null;
  }

  const { orderDate, orderStatus, deliveryAddress, billingAddress, paymentMethod, cartItems } = commande;
  let total = commande.cartItems.total;

  const handleCancelOrder = async () => {
    try {
      const response = await axios.put(`${VITE_API}commandes/${orderId}.json`, { ...commande, status: 'ANNULÉE' });
      if (response.status === 200) {
        // Utilisez la logique appropriée pour recharger l'écran
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturn = async (productId, quantity) => {
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

    await axios.put(`${VITE_API}commandes/${orderId}.json`, newCommande);

    const productResponse = await axios.get(`${VITE_API}produits/${productId}.json`);
    let productData = productResponse.data;
    productData.stock += quantity;
    await axios.put(`${VITE_API}produits/${productId}.json`, productData);

    // Utilisez la logique appropriée pour recharger l'écran
  };

  const updateQuantityInOrder = async (productId, newQuantity) => {
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
      await axios.put(`${VITE_API}commandes/${orderId}.json`, newCommande);

      const productsResponse = await axios.get(`${VITE_API}produits.json`);
      const products = productsResponse.data;

      for (const key in products) {
        if (products[key].product_id === productId) {
          const updatedProduct = { ...products[key], quantity: products[key].quantity + quantityDifference };
          await axios.put(`${VITE_API}produits/${key}.json`, updatedProduct);
          break;
        }
      }

      // Utilisez la logique appropriée pour recharger l'écran
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center', marginVertical: 5 }}>
        <Text>Commande #{orderId} - {orderDate} - {commande.status}</Text>
        {commande.status === 'EN COURS' && (
          <Button title="Annuler la commande" onPress={handleCancelOrder} />
        )}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
        <View style={{ width: '50%' }}>
          {cartItems.cart.map((product, index) => (
            <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
              <View style={{ width: '25%' }}>
                <Image source={{ uri: product.images }} style={{ width: '100%', aspectRatio: 1 }} />
              </View>
              <View style={{ width: '50%' }}>
                <Text>{product.name}</Text>
                <Text>{product.description}</Text>
              </View>
              <View style={{ width: '25%' }}>
                <Text>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(product.price)}</Text>
                {commande.status === 'EN COURS' && (
                  <TextInput
                    style={{ width: '90%', marginBottom: 3 }}
                    keyboardType="numeric"
                    value={tempQuantities[product.product_id] || product.quantityInCart.toString()}
                    onChangeText={text => handleQuantityChange(product.product_id, text)}
                  />
                )}
                {commande.status === 'ANNULÉE' || commande.status === 'LIVRÉE' || commande.status === 'EXPÉDIÉE' && (
                  <Text>{product.quantityInCart} exemplaires</Text>
                )}
                <Text>Delete icon</Text>
                {commande.status === 'EN COURS' && (
                  <Button title="Faire un retour du produit" onPress={() => handleReturnProduct(product.product_id)} />
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={{ width: '50%' }}>
          <Text style={{ justifyContent: 'space-between' }}>
            Total
            <Text>{total}€</Text>
          </Text>
          <Text style={{ justifyContent: 'space-between' }}>
            TVA
            <Text>{total * 0.2}€</Text> {/* Calculer la TVA ici */}
          </Text>
          <Text style={{ marginTop: 3 }}>Adresse de livraison</Text>
          <Text>{deliveryAddress.prenom} {deliveryAddress.nom}</Text>
          <Text>{deliveryAddress.adresse1}</Text>
          <Text>{deliveryAddress.adresse2}</Text>
          <Text>{deliveryAddress.codePostal} {deliveryAddress.ville}</Text>
          <Text>{deliveryAddress.pays}</Text>
          <Text>{deliveryAddress.telephone}</Text>
          <Text style={{ marginTop: 3 }}>Adresse de facturation</Text>
          {/* Ajouter l'adresse de facturation ici */}
          <Text>{billingAddress.prenom} {deliveryAddress.nom}</Text>
          <Text>{billingAddress.adresse1}</Text>
          <Text>{billingAddress.adresse2}</Text>
          <Text>{billingAddress.codePostal} {deliveryAddress.ville}</Text>
          <Text>{billingAddress.pays}</Text>
          <Text>{billingAddress.telephone}</Text>
          <Text style={{ marginTop: 3 }}>Méthode de paiement</Text>
          <Text>Carte de crédit</Text>
          <Text>{'**** **** **** ' + paymentMethod.cardNumber.slice(-4)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MaCommande;
