import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import useEmailValidation from '../verif/useEmailExiste';
import axios from 'axios';
import { VITE_API } from "@env";
import { useNavigation } from '@react-navigation/native';
import Menu from '../composants/Menu';


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
    <SafeAreaView style={styles.container}>
      <Menu />
      <View style={styles.content}>
        <Text style={styles.title}>Inscription</Text>

        <View style={styles.inputContainer}>
          <Text>Nom Complet:</Text>
          <TextInput
            style={styles.input}
            name="firstName"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            name="email"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Mot de Passe:</Text>
          <TextInput
            style={styles.input}
            name="password"
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

        <Text style={styles.errorMessage}>{errorMessage}</Text>








        <View style={styles.textContainer}>
          <Text>Déjà un compte ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
          <Text style={styles.link}>Connectez-vous.</Text>
          </TouchableOpacity>
        </View>






      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  link: {
    color: 'blue',
    marginLeft: 5,
  },
});

export default Inscription;
