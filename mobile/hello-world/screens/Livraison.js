import React, { useState, useEffect, useContext } from 'react';
import { Button, TextInput, View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { Picker}  from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../context/Authcontext';
import { VITE_API } from "@env";
import Menu from '../composants/Menu';
import styles from '../styles';


const Livraison = () => {
    const navigation = useNavigation();
    const { isAuthenticated, userName, logout, user_Id } = useContext(AuthContext);
    const [userIdFromStorage, setUserIdFromStorage] = useState(null);
    const [adresses, setAdresses] = useState([]);
    const [selectedAdresse, setSelectedAdresse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [adresse1, setAdresse1] = useState('');
    const [adresse2, setAdresse2] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [pays, setPays] = useState('');
    const [telephone, setTelephone] = useState('');
    const [loadingDelay, setLoadingDelay] = useState(true);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchAdresses = async () => {
          try {
            const response = await axios.get(`${VITE_API}adresses.json`);
            const adressesData = response.data;
            const userAdresses = Object.values(adressesData).filter((adresse) => adresse.user_Id === userIdFromStorage);
            setAdresses(userAdresses);
           // setSelectedAdresse(userAdresses[0]); // set first address as selected
            setLoading(false);
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        };
        fetchAdresses();
      }, [adresses]);

    useEffect(() => {
        (async () => {
            const userId = await AsyncStorage.getItem('userID');
            setUserIdFromStorage(userId);
            if (!isAuthenticated) {
                navigation.navigate("Connexion"); // or the path of your login page
            }
            // Appeler l'API pour obtenir les adresses
        })();
        
    }, [isAuthenticated]);
    useEffect(() => {
        if (selectedAdresse) {
            setPrenom(selectedAdresse.prenom);
            setNom(selectedAdresse.nom);
            setAdresse1(selectedAdresse.adresse1);
            setAdresse2(selectedAdresse.adresse2 || '');
            setVille(selectedAdresse.ville);
            setCodePostal(selectedAdresse.codePostal);
            setPays(selectedAdresse.pays);
            setTelephone(selectedAdresse.telephone);
        }
    }, [selectedAdresse]);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingDelay(false);
        }, 5000); 
    
        return () => {
            clearTimeout(timer);
        };
    }, []);

    
      
    const handleAdresseSelect = (value) => {
        const selectedAdresse = adresses.find((adresse, index) => adresse.id ? adresse.id === value : index === value);
        setSelectedAdresse(selectedAdresse);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Données du formulaire à envoyer
        const data = {
            user_Id: userIdFromStorage,
            prenom: prenom,
            nom: nom,
            adresse1: adresse1,
            adresse2: adresse2,
            ville: ville,
            codePostal: codePostal,
            pays: pays, 
            telephone: telephone,
        };

        // Stocker l'adresse de livraison dans le AsyncStorage
        await AsyncStorage.setItem('deliveryAddress', JSON.stringify(data));

        // Vérifiez si l'adresse sélectionnée correspond aux données du formulaire
        if (selectedAdresse &&
            selectedAdresse.prenom === prenom &&
            selectedAdresse.nom === nom &&
            selectedAdresse.adresse1 === adresse1 &&
            selectedAdresse.adresse2 === adresse2 &&
            selectedAdresse.ville === ville &&
            selectedAdresse.codePostal === codePostal &&
            selectedAdresse.pays === pays && 
            selectedAdresse.telephone === telephone) {
            // Si c'est le cas, ne faites rien et naviguez directement vers la page de paiement
            navigation.navigate("Paiement");
            return;
        }
        
        try {
            // Envoyer les données à l'API avec axios
            const response = await axios.post(`${VITE_API}adresses.json`, data);
    
            // Si tout se passe bien, affiche un message dans la console
            if (response.status === 200) {
                console.log("Adresse enregistrée");
                // Naviguer vers la page de paiement
                navigation.navigate("Paiement");
            }
        } catch (error) {
            console.error(error);
        }
    };
    // if (!adresses.length) {
    //     return <ActivityIndicator size="large" color="#0000ff" />;
    // } 
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Menu />
            <View style={styles.cartItemContainer}>
                <View style={styles.spacer} />
                
                    <Picker
                        selectedValue={selectedAdresse?.id}
                        onValueChange={(itemValue) => handleAdresseSelect(itemValue)}
                    >
                        {adresses && adresses.length > 0 && adresses.map((adresse, index) => (
                            <Picker.Item key={index} label={adresse.adresse1 + ", " + adresse.ville} value={index} />
                        ))}
                    </Picker>
                
                <View style={styles.spacer} />
                <TextInput 
                    placeholder="Prénom"
                    style={styles.input}
                    value={prenom}
                    onChangeText={setPrenom}
                />
                <View style={styles.spacer} />
                <TextInput 
                    placeholder="Nom"
                    style={styles.input}
                    value={nom}
                    onChangeText={setNom}
                />
                <View style={styles.spacer} />    
                <TextInput 
                    placeholder="Adresse 1"
                    style={styles.input}
                    value={adresse1}
                    onChangeText={setAdresse1}
                />
                <View style={styles.spacer} />
                <TextInput 
                    placeholder="Adresse 2"
                    style={styles.input}
                    value={adresse2}
                    onChangeText={setAdresse2}
                />
                <View style={styles.spacer} />
                <TextInput 
                    placeholder="Ville"
                    style={styles.input}
                    value={ville}
                    onChangeText={setVille}
                />
                <View style={styles.spacer} />
                <TextInput 
                    placeholder="Code Postal"
                    style={styles.input}
                    value={codePostal}
                    onChangeText={setCodePostal}
                />
                <View style={styles.spacer} />
                <TextInput 
                    placeholder="Pays"
                    value={pays}
                    onChangeText={setPays}
                    style={styles.input}
                />
                <View style={styles.spacer} />
                <TextInput 
                    placeholder="Numéro de téléphone"
                    value={telephone}
                    onChangeText={setTelephone}
                    style={styles.input}
                />
                <View style={styles.spacer} />
                <Button
                    title="Procéder au paiement"
                    onPress={handleSubmit}
                    color="#BDA18A"
                />
            </View>
        </ScrollView>
      );
    }

 
export default Livraison;
