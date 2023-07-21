import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import useEmailValidation from '../verif/useEmailExiste';
import axios from 'axios';
import { VITE_API } from "@env";
import { useNavigation } from '@react-navigation/native';
import Menu from '../composants/Menu';
import styles from '../styles';

const Inscription = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
  });

  const isEmailValid = useEmailValidation(formData.email);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async () => {
    try {
      if (!isEmailValid) {
        setErrorMessage("L'adresse e-mail est déjà utilisée.");
        return;
      }
  
      const response = await axios.post(`${VITE_API}clients.json`, formData);
      console.log(response); // Affichez la réponse dans la console
      setErrorMessage("Inscription réussie !");
      // Naviguer vers une autre page ici
    } catch (error) {
      console.error(error); // Affichez l'erreur dans la console
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
      <View style={styles.cartItemContainer}>
        <Text style={styles.subTitle}>Inscription</Text>

        <View style={styles.loginContainer}>
          <Text style={styles.title}>Nom Complet:</Text>
          <TextInput
            style={styles.input}
            name="firstName"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.title}>Email:</Text>
          <TextInput
            style={styles.input}
            name="email"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.title}>Mot de Passe:</Text>
          <TextInput
            style={styles.input}
            name="password"
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
        </View>

        <View style={styles.spacer} />
              <Button
                  title="Se Connecter"
                  onPress={handleSubmit}
                  color="#BDA18A"
                />

        <Text style={styles.errorMessage}>{errorMessage}</Text>








        <View style={styles.cartItemDetails}>
          <Text>Déjà un compte ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
          <Text style={styles.text}>Connectez-vous.</Text>
          </TouchableOpacity>
        </View>






      </View>
    </ScrollView>
  );
};



export default Inscription;
