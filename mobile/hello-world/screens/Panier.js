// Panier.js
import React, { useContext } from 'react';
import { View, Text, Image, TextInput, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import Menu from '../composants/Menu';
import { CartContext } from "../context/CartContext";
import { VITE_API } from "@env";

const Panier = () => {
  const { cart, updateQuantity, removeFromCart, startCheckout, checkoutInProgress, clearCart } = useContext(CartContext);
  const total = cart.reduce((total, product) => total + product.price * product.quantityInCart, 0);
  const tva = total * 0.2;
  const userIdFromStorage = '...'; // récupérez l'ID de l'utilisateur à partir du stockage
  const navigation = useNavigation();

  console.log(cart)

  const handleCheckout = async () => {
    let orderNumber = Math.floor(Math.random() * 1e9);

    await AsyncStorage.setItem('orderNumber', orderNumber.toString());

    startCheckout();

    const panierData = {
      user_id: userIdFromStorage,
      cart: cart,
      total: total,
      tva: tva,
      orderNumber: orderNumber,
      timestamp: Date.now(),
    };

    await AsyncStorage.setItem('infocart', JSON.stringify(panierData));

    try {
      await axios.post(`${VITE_API}paniers.json`, panierData)
        .then((response) => {
          console.log("Commande enregistrée avec succès");
          clearCart();
          navigation.navigate('Confirmation');
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la commande : ", error);
        });

      navigation.navigate('Confirmation');
    } catch (error) {
      console.error("Erreur lors du traitement du paiement : ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
      <Text style={styles.title}>Panier</Text>
      {cart.map((product, index) => (
        <View key={index} style={styles.cartItemContainer}>
          <Image source={{ uri: product.image[0] }} style={styles.cartItemImage} />
          <View style={styles.cartItemDetails}>
            <Text style={styles.cartItemName}>{product.name}</Text>
            <Text style={styles.cartItemDescription}>{product.description}</Text>
          </View>
          <View style={styles.cartItemPriceContainer}>
            <Text style={styles.cartItemPrice}>
              {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(product.price)}
            </Text>
            <TextInput
              style={styles.cartItemQuantityInput}
              keyboardType="numeric"
              value={product.quantityInCart.toString()}
              onChangeText={(text) => updateQuantity(product.id, text)}
            />
            <Button title="Supprimer" onPress={() => removeFromCart(product.id)} color="red" />
          </View>
        </View>
      ))}
      <View style={styles.cartTotalContainer}>
        <Text style={styles.cartTotalText}>
          Total: {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(total)}
        </Text>
        <Text style={styles.cartTotalText}>
          TVA: {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(tva)}
        </Text>
        {cart.length > 0 && (
          <Button
            title="Procéder au paiement"
            onPress={handleCheckout}
            disabled={checkoutInProgress}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Panier;
