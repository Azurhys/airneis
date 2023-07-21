// Panier.js
import React, { useContext, useEffect, useState } from 'react';
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
  const [userIdFromStorage, setUserIdFromStorage] = useState('');// récupérez l'ID de l'utilisateur à partir du stockage
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      const userID = await AsyncStorage.getItem('userID');
      setUserIdFromStorage(userID);
    }

    fetchUserId();
  }, []);

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
          navigation.navigate('Livraison');
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la commande : ", error);
        });

      navigation.navigate('Livraison');
    } catch (error) {
      console.error("Erreur lors du traitement du paiement : ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
        <View style={styles.cartItemContainer}>
          <Text style={styles.subTitle}>Panier</Text>
          {cart.map((product, index) => (
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
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={product.quantityInCart.toString()}
                        onChangeText={(text) => updateQuantity(product.id, text)}
                      />
                    </View>
                    <Button title="🗑️" onPress={() => removeFromCart(product.id)} color="red" />
                  </View>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.cartItemDetails}>
            <Text style={styles.subTitleCart}>Total:</Text>
            <Text style={styles.subTitleCart}>
               {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(total)}
            </Text>
          </View>
            <View style={styles.cartItemDetails}>
              <Text style={styles.status}>TVA :</Text>
              <Text style={styles.status}>
                {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(tva)}
              </Text>
            </View>
            {cart.length > 0 && (
              <Button
                title="Procéder au paiement"
                onPress={handleCheckout}
                disabled={checkoutInProgress}
                color="#BDA18A"
              />
            )}
          
        </View>
    </ScrollView>
  );
};

export default Panier;
