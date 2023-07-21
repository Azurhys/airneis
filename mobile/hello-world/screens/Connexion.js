import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import Menu from '../composants/Menu';
import useLoginValidation from '../verif/useLoginValidation';
import { AuthContext }  from '../context/Authcontext';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

export default function Connexion() {
  const { checkoutInProgress, startCheckout, completeCheckout } = useContext(CartContext);
  const navigation = useNavigation();
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
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
      <View style={styles.cartItemContainer}>
      <Text style={styles.subTitle}>Connexion</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <View style={styles.spacer} />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />
          <View style={styles.spacer} />
            <Button
                  title="Se Connecter"
                  onPress={handleSubmit}
                  color="#BDA18A"
                />
          <View style={styles.spacer} />
        </View>
        {errorMessage && (
          <View style={styles.errorMessage}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}


          <View style={styles.cartItemDetails}>
            <Text>Pas de compte ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
                <Text style={styles.text}>Inscrivez-vous.</Text>
              </TouchableOpacity>
          </View>

          </View>    
    </ScrollView>
  );
}

