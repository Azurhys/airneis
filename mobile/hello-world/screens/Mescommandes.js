import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView } from 'react-native';
import { useCommandes } from '../hook/useCommandes';
import { AuthContext } from '../context/Authcontext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Menu from '../composants/Menu';
import styles from '../styles';

const MesCommandes = () => {
  const { isAuthenticated, user_Id } = useContext(AuthContext);
  const [commandes] = useCommandes();
  const [userIdFromStorage, setUserIdFromStorage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await AsyncStorage.getItem('userID');
      setUserIdFromStorage(userId);
    };

    fetchUserId();
  }, []);

  // Filtrer les commandes pour n'obtenir que celles de l'utilisateur connecté
  const userCommandes = commandes.filter(commande => commande.userId === userIdFromStorage);

  // Triez les commandes par année
  const commandesByYear = userCommandes.reduce((acc, commande) => {
    const [day, month, year] = commande.orderDate.split("/").map(Number); // convertir en tableau de nombres
    const date = new Date(year, month - 1, day); // créer un objet Date
    const fullYear = date.getFullYear(); // obtenir l'année complète (4 chiffres)

    if (!acc[fullYear]) {
      acc[fullYear] = [];
    }
    acc[fullYear].push(commande);
    return acc;
  }, {});

  const getTotalItems = (cartItems) => {
    let total = 0;
    for (const item of cartItems) {
      total += item.quantityInCart;
    }
    return total;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
      <Text style={styles.subTitle}>Mes Commandes</Text>
      <View style={styles.cartItemContainer}>
        {Object.keys(commandesByYear).sort().reverse().map(year => (
          <View key={year}  style={styles.orderMap} >
            <Text style={styles.year}>{year}</Text>
              <View style={styles.spacer} />
              {commandesByYear[year].map(commande => (
                <View key={commande.id} style={styles.orderContainer}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Macommande', { orderId: commande.orderId })}
                  >
                    <View style={styles.cartItemDetails}>
                      <Text style={styles.title}>{commande.orderDate} - {commande.orderId}</Text>
                      <Text style={styles.title}>{commande.status}</Text>
                    </View>
                    <View style={styles.cartItemDetails}>
                      <Text style={styles.nbArticle}>{getTotalItems(commande.cartItems.cart)} articles</Text>
                      <Text style={styles.title}>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(commande.cartItems.total)}</Text>
                    </View>
                    <View style={styles.spacer} />
                    <View style={styles.spacer} />
                  </TouchableOpacity>
                  
                </View>
                
              ))}
            
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default MesCommandes;
