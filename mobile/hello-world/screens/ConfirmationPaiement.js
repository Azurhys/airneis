import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../composants/Menu';
import styles from '../styles';

const ConfirmationPaiement = () => {

    const [orderNumberFromStorage, setOrderNumberFromStorage] = useState(null);

    useEffect(() => {
        (async () => {
            const orderNumber = await AsyncStorage.getItem('orderNumber');
            setOrderNumberFromStorage(orderNumber);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Menu />
            <View style={styles.cartItemContainer}>
                <Text style={styles.subTitle}>Commande effectuée</Text>
                <Text style={styles.description}>
                    Votre commande à bien été enregistrée sous le numéro {orderNumberFromStorage}.
                    Vous pouvez suivre son état depuis votre espace client.
                </Text>
            </View>
        </View>
    );
}
 
export default ConfirmationPaiement;
