import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <Menu />
      <Text style={{ textAlign: 'center', marginTop: 20, marginBottom: 10, fontSize: 24 }}>Mes Commandes</Text>
      <View style={{ alignItems: 'center' }}>
        {Object.keys(commandesByYear).sort().reverse().map(year => (
          <View key={year}>
            <Text style={{ fontSize: 20 }}>{year}</Text>
            {commandesByYear[year].map(commande => (
              <TouchableOpacity
                key={commande.id}
                style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}
                onPress={() => navigation.navigate('Macommande', { orderId: commande.orderId })}
              >
                <Text style={{ width: '50%', fontSize: 18 }}>{commande.orderDate} - {commande.orderId}</Text>
                <Text style={{ width: '50%', fontSize: 18 }}>{commande.status}</Text>
                <Text style={{ width: '50%', color: 'gray', fontSize: 16 }}>{getTotalItems(commande.cartItems.cart)} articles</Text>
                <Text style={{ width: '50%', fontSize: 18 }}>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(commande.cartItems.total)}</Text>
                <Text style={{ color: 'blue' }}>Voir détails</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default MesCommandes;
