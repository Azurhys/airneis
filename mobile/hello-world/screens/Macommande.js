import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, ScrollView } from 'react-native';
//import { useParams } from 'react-router-dom';
import { useCommandes } from '../hook/useCommandes';
import { VITE_API } from "@env";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import styles from '../styles';
import Menu from '../composants/Menu';

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
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
      <View style={styles.cartItemContainer}>
        <View style={styles.spacer} />
        <View >
          <Text style={styles.subTitleOrder}>Commande #{orderId} </Text>
          <Text style={styles.subTitleOrder}>{orderDate} - {commande.status}</Text>
          {commande.status === 'EN COURS' && (
            <Button title="Annuler la commande" onPress={handleCancelOrder} />
          )}
        </View>
        <View style={styles.spacer} />
            {cartItems.cart.map((product, index) => (
              <View key={index} style={styles.cartCard}>
                <Image source={{ uri: product.image[0] }} style={styles.cartItemImage} />
                <View style={styles.cartSubCard}>
                <View style={styles.cartItemDetails}>
                  <Text style={styles.subTitleCart}>{product.name}</Text>
                  <Text style={styles.subTitleCart}>
                    {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(product.price)}
                  </Text>
                </View>
                
                  <View style={styles.cartItemDetails}>
                  
                    <Text style={styles.descriptionCart}>
                      {product.description}
                    </Text>
                  <View style={styles.cartSubCard2}>
                    <View style={styles.spacer}>
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
                    </View>
                    {commande.status === 'EN COURS' && (
                    <Button title="🗑️" onPress={() => removeFromCart(product.id)} color="red" />
                    )}
                    </View>
                </View>
                
                </View>
              </View>
            ))}
          

          
            <View style={styles.cartItemDetails}>
              <Text style={styles.subTitleCart}>
                Total
               </Text>
              <Text style={styles.subTitleCart}>{total}€</Text>
            </View>
            <View style={styles.cartItemDetails}>
              <Text style={styles.status}>TVA</Text>
              <Text style={styles.status} >{total * 0.2}€</Text> 
            </View>
            <Text style={styles.subTitleCart}>Adresse de livraison</Text>
            <Text>{deliveryAddress.prenom} {deliveryAddress.nom}</Text>
            <Text>{deliveryAddress.adresse1}</Text>
            <Text>{deliveryAddress.adresse2}</Text>
            <Text>{deliveryAddress.codePostal} {deliveryAddress.ville}</Text>
            <Text>{deliveryAddress.pays}</Text>
            <Text>{deliveryAddress.telephone}</Text>
            <Text style={styles.subTitleCart}>Adresse de facturation</Text>
            {/* Ajouter l'adresse de facturation ici */}
            <Text>{billingAddress.prenom} {deliveryAddress.nom}</Text>
            <Text>{billingAddress.adresse1}</Text>
            <Text>{billingAddress.adresse2}</Text>
            <Text>{billingAddress.codePostal} {deliveryAddress.ville}</Text>
            <Text>{billingAddress.pays}</Text>
            <Text>{billingAddress.telephone}</Text>
            <Text style={styles.subTitleCart}>Méthode de paiement</Text>
            <Text>Carte de crédit</Text>
            <Text>{'**** **** **** ' + paymentMethod.cardNumber.slice(-4)}</Text>
          
        </View>
      
    </ScrollView>
  );
};

export default MaCommande;
