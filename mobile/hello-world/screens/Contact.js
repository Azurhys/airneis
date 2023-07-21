import React, { useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import useContact from "../hook/useContact";
import styles from '../styles';
import Menu from '../composants/Menu';

const Contact = () => {
  const emailRef = useRef();
  const messageRef = useRef();
  const sujetRef = useRef();
  const { isSuccess, error, handleSubmit } = useContact();

  const handleFormSubmit = () => {
    const email = emailRef.current.value;
    const sujet = sujetRef.current.value;
    const text = messageRef.current.value;
    handleSubmit(email, sujet, text);
  };

  const handleFocus = () => {
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
      <View style={styles.cartItemContainer}>
        <Text style={styles.subTitle}>Nous contacter</Text>
        <Text style={styles.title}>Pour nous contacter, veuillez compléter le formulaire suivant :</Text>
        <View style={styles.spacer} />
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Votre@email.fr"
            ref={emailRef}
            onFocus={handleFocus}
          />
          <View style={styles.spacer} />
          <TextInput
            style={styles.input}
            placeholder="Sujet"
            ref={sujetRef}
            onFocus={handleFocus}
          />
          <View style={styles.spacer} />
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={5}
            placeholder="Votre message"
            ref={messageRef}
            onFocus={handleFocus}
          />
          <View style={styles.spacer} />
          <Button title="Envoyer" onPress={handleFormSubmit} color="#BDA18A"/>
          
        </View>
      </View>
    </ScrollView>
  );
};

export default Contact;
