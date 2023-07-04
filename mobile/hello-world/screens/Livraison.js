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

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [adresse1, setAdresse1] = useState('');
    const [adresse2, setAdresse2] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [pays, setPays] = useState('');
    const [telephone, setTelephone] = useState('');

    useEffect(() => {
        (async () => {
            const userId = await AsyncStorage.getItem('userID');
            setUserIdFromStorage(userId);
            if (!isAuthenticated) {
                navigation.navigate("Connexion"); // or the path of your login page
            }
            // Appeler l'API pour obtenir les adresses
            fetchAdresses();
        })();
    }, [isAuthenticated]);

    const fetchAdresses = async () => {
        try {
            const response = await axios.get(`${VITE_API}adresses.json`);
            const adressesData = response.data;
            const userAdresses = Object.values(adressesData).filter((adresse) => adresse.user_Id === userIdFromStorage);
            setAdresses(userAdresses);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdresseSelect = (id) => {
        const selectedAdresse = adresses.find(adresse => adresse.id === id);
        setSelectedAdresse(selectedAdresse);
    }

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
            navigation.navigate("/Paiement");
            return;
        }
    
        try {
            // Envoyer les données à l'API avec axios
            const response = await axios.post(`${VITE_API}adresses.json`, data);
    
            // Si tout se passe bien, affiche un message dans la console
            if (response.status === 200) {
                console.log("Adresse enregistrée");
                // Naviguer vers la page de paiement
                navigation.navigate("/Paiement");
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Menu />
            
            <Picker
                selectedValue={selectedAdresse?.id}
                onValueChange={(itemValue) => handleAdresseSelect(itemValue)}
            >
                {adresses.map(adresse => (
                    <Picker.Item label={adresse.adresse1 + ", " + adresse.ville} value={adresse.id} key={adresse.id} />
                ))}
            </Picker>
            
            <TextInput 
                placeholder="Prénom"
                value={prenom}
                onChangeText={setPrenom}
            />
            
            <TextInput 
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
            />
            
            <TextInput 
                placeholder="Adresse 1"
                value={adresse1}
                onChangeText={setAdresse1}
            />

            <TextInput 
                placeholder="Adresse 2"
                value={adresse2}
                onChangeText={setAdresse2}
            />

            <TextInput 
                placeholder="Ville"
                value={ville}
                onChangeText={setVille}
            />

            <TextInput 
                placeholder="Code Postal"
                value={codePostal}
                onChangeText={setCodePostal}
            />

            <TextInput 
                placeholder="Pays"
                value={pays}
                onChangeText={setPays}
            />

            <TextInput 
                placeholder="Numéro de téléphone"
                value={telephone}
                onChangeText={setTelephone}
            />

            <TouchableOpacity onPress={handleSubmit}>
                <Text>Procéder au paiement</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
 
export default Livraison;
