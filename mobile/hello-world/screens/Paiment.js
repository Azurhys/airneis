import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import { Button, TextInput, View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VITE_API } from "@env";
import { Picker } from "@react-native-picker/picker";
import { cartContext } from '../context/CartContext';
import Menu from '../composants/Menu';
import styles from '../styles';
import { Checkbox } from 'react-native-paper';

function getRandomStatus() {
    const statuses = ['EN COURS', 'LIVRÉE', 'EXPÉDIÉE'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

const Paiement = () => {
    const navigation = useNavigation();
    const { isAuthenticated, userName, logout, user_Id } = useContext(AuthContext);
    const [userIdFromStorage, setUserIdFromStorage] = useState(null);
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [useDeliveryAddress, setUseDeliveryAddress] = useState(false);
    const [billingAddresses, setBillingAddresses] = useState([]);

    const initialBillingAddress = {
        prenom: '',
        nom: '',
        adresse1: '',
        adresse2: '',
        ville: '',
        codePostal: '',
        pays: '',
        telephone: '',
    };

    const [billingDetails, setBillingDetails] = useState(initialBillingAddress);

    const handleBillingDetailsChange = (name, value) => {
        setBillingDetails({ ...billingDetails, [name]: value });
    };
      
    useEffect(() => {
        (async () => {
            const userId = await AsyncStorage.getItem('userID');
            setUserIdFromStorage(userId);
            if (!isAuthenticated) {
                navigation.navigate("Connexion");
            }
            fetchPaymentOptions();
            fetchBillingAddresses();
        })();
    }, [isAuthenticated]);

    const fetchPaymentOptions = async () => {
        try {
            const response = await axios.get(`${VITE_API}facturation.json`);
            const paymentCards = Object.values(response.data).filter(card => card.user_Id === userIdFromStorage);
            setPaymentOptions(paymentCards);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchBillingAddresses = async () => {
        try {
            const response = await axios.get(`${VITE_API}billingAddress.json`);
            const addresses = Object.values(response.data).filter(address => address.user_Id === userIdFromStorage);
            setBillingAddresses(addresses);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePaymentSelect = (payment) => {
        setSelectedPayment(payment);
        setCardName(payment.cardName);
        setCardNumber(payment.cardNumber);
        setExpiryDate(payment.expiryDate);
        setCvv(payment.cvv);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const deliveryAddress = JSON.parse(await AsyncStorage.getItem('deliveryAddress'));
        const billingAddressToUse = useDeliveryAddress ? deliveryAddress : billingDetails;
        setBillingDetails(billingAddressToUse);
        
        const addressExists = billingAddresses.some(address => 
            address.prenom === billingAddressToUse.prenom &&
            address.nom === billingAddressToUse.nom &&
            address.adresse1 === billingAddressToUse.adresse1 &&
            address.adresse2 === billingAddressToUse.adresse2 &&
            address.ville === billingAddressToUse.ville &&
            address.codePostal === billingAddressToUse.codePostal &&
            address.pays === billingAddressToUse.pays &&
            address.telephone === billingAddressToUse.telephone
        );
    
        if (!addressExists) {
            try {
                const response = await axios.post(`${VITE_API}billingAddress.json`, { ...billingAddressToUse, user_Id: userIdFromStorage });
                if (response.status === 200) {
                    console.log("Adresse de facturation enregistrée");
                }
            } catch (error) {
                console.error(error);
            }
        }
    
        if (!selectedPayment) {
            const data = {
                user_Id: userIdFromStorage,
                cardName: cardName,
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
            };
            // Stocker les détails de paiement dans le AsyncStorage
            await AsyncStorage.setItem('paymentDetails', JSON.stringify(data));
            try {
                const response = await axios.post(`${VITE_API}facturation.json`, data);
                if (response.status === 200) {
                    console.log("Payment information registered");
                    navigation.navigate("ConfirmationPaiement");
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("Payment information already exists");
            await AsyncStorage.setItem('paymentDetails', JSON.stringify(selectedPayment));
            navigation.navigate("ConfirmationPaiement");
        }
    
        const cartItems = JSON.parse(await AsyncStorage.getItem('infocart'));
        const paymentDetails = JSON.parse(await AsyncStorage.getItem('paymentDetails'));
        const userId = await AsyncStorage.getItem('userID');
        const orderNumberFromStorage = await AsyncStorage.getItem('orderNumber'); // Add this line to retrieve orderNumber
    
        const today = new Date();
        const formattedDate = today.toLocaleDateString('fr-FR');
    
        const order = {
            orderId: orderNumberFromStorage, // use the retrieved orderNumber here
            userId: userId,
            cartItems: cartItems,
            deliveryAddress: deliveryAddress,
            paymentMethod: paymentDetails,
            orderDate: formattedDate,
            billingAddress: billingAddressToUse,
            status: getRandomStatus()
        };
    
        try {
            const response = await axios.put(`${VITE_API}commandes/${order.orderId}.json`, order);
            if (response.status === 200) {
                console.log("Commande enregistrée");
    
                await AsyncStorage.removeItem('infocart');
                await AsyncStorage.removeItem('cart');
                await AsyncStorage.removeItem('deliveryAddress');
                await AsyncStorage.removeItem('paymentDetails');
                clearCart();
            }
        } catch (error) {
            console.error(error);
        }
    };
    


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Menu />
            
            <Picker
                selectedValue={selectedPayment?.cardNumber}
                onValueChange={(itemValue) => handlePaymentSelect(itemValue)}
            >
                {paymentOptions.map(payment => (
                    <Picker.Item label={payment.cardName + ", " + payment.cardNumber} value={payment} key={payment.cardNumber} />
                ))}
            </Picker>
            
            <TextInput 
                placeholder="Nom sur la carte"
                value={cardName}
                onChangeText={(value) => setCardName(value)}
            />
            
            <TextInput 
                placeholder="Numéro de carte"
                value={cardNumber}
                onChangeText={(value) => setCardNumber(value)}
            />
            
            <TextInput 
                placeholder="Date d'expiration"
                value={expiryDate}
                onChangeText={(value) => setExpiryDate(value)}
            />

            <TextInput 
                placeholder="CVV"
                value={cvv}
                onChangeText={(value) => setCvv(value)}
            />

            <Checkbox
                status={useDeliveryAddress ? 'checked' : 'unchecked'}
                onPress={() => setUseDeliveryAddress(!useDeliveryAddress)}
            />

            <Text>Utilisez l'adresse de livraison comme adresse de facturation</Text>

            <Picker
                selectedValue={billingDetails}
                onValueChange={(itemValue) => handleBillingDetailsChange(itemValue)}
            >
                {billingAddresses.map((address, index) => (
                    <Picker.Item label={address.prenom + " " + address.nom + " - " + address.adresse1 + ", " + address.ville} value={address} key={index} />
                ))}
            </Picker>

            {!useDeliveryAddress && (
                <>
                <TextInput 
                    placeholder="Prénom"
                    value={billingDetails.prenom}
                    onChangeText={(value) => handleBillingDetailsChange('prenom', value)}
                />

                <TextInput 
                    placeholder="Nom"
                    value={billingDetails.nom}
                    onChangeText={(value) => handleBillingDetailsChange('nom', value)}
                />

                <TextInput 
                    placeholder="Adresse 1"
                    value={billingDetails.adresse1}
                    onChangeText={(value) => handleBillingDetailsChange('adresse1', value)}
                />

                <TextInput 
                    placeholder="Adresse 2"
                    value={billingDetails.adresse2}
                    onChangeText={(value) => handleBillingDetailsChange('adresse2', value)}
                />

                <TextInput 
                    placeholder="Ville"
                    value={billingDetails.ville}
                    onChangeText={(value) => handleBillingDetailsChange('ville', value)}
                />

                <TextInput 
                    placeholder="Code Postal"
                    value={billingDetails.codePostal}
                    onChangeText={(value) => handleBillingDetailsChange('codePostal', value)}
                />

                <TextInput 
                    placeholder="Pays"
                    value={billingDetails.pays}
                    onChangeText={(value) => handleBillingDetailsChange('pays', value)}
                />

                <TextInput 
                    placeholder="Numéro de téléphone"
                    value={billingDetails.telephone}
                    onChangeText={(value) => handleBillingDetailsChange('telephone', value)}
                />
                </>
            )}

            <TouchableOpacity onPress={handleSubmit}>
                <Text>Procéder à la confirmation</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
 
export default Paiement;
