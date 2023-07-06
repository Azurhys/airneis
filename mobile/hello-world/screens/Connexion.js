import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Menu from '../composants/Menu';
import useLoginValidation from '../verif/useLoginValidation';
import { AuthContext }  from '../context/Authcontext';
import { CartContext } from '../context/CartContext';

export default function Connexion() {
  const { checkoutInProgress, startCheckout, completeCheckout } = useContext(CartContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isLoginValid = useLoginValidation(formData.email, formData.password);
  const { isValid, firstName, categorie_user_Id, user_Id} = isLoginValid;

  const [errorMessage, setErrorMessage] = useState('');
  const { isAuthenticated, login } = useContext(AuthContext);

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = () => {
    if (!isValid) {
      setErrorMessage("L'adresse e-mail ou le mot de passe est incorrecte.");
    } else {
      login(firstName, categorie_user_Id, user_Id);
      //login(formData.email, formData.password);
    }
  };

  useEffect(() => {
    if (checkoutInProgress && isAuthenticated) {
      // Naviguer vers la page de livraison
    } else if (!checkoutInProgress && isAuthenticated) {
      // Naviguer vers la page d'accueil
    }
  }, [checkoutInProgress, isAuthenticated]);

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Text>Connexion</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
      {errorMessage && (
        <View style={styles.errorMessage}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}


        <View style={styles.textContainer}>
          <Text>Pas de compte ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
          <Text style={styles.link}>Inscrivez-vous.</Text>
          </TouchableOpacity>
        </View>


    </SafeAreaView>
  );
}

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
