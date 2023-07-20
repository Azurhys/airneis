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
    setAlerte({});
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
      <View style={styles.container}>
        <Text style={styles.title}>Nous contacter</Text>
        <Text style={styles.text}>Pour nous contacter, veuillez compléter le formulaire suivant :</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Votre@email.fr"
            ref={emailRef}
            onFocus={handleFocus}
          />
          <TextInput
            style={styles.input}
            placeholder="Sujet"
            ref={sujetRef}
            onFocus={handleFocus}
          />
          <TextInput
            style={styles.textarea}
            multiline
            numberOfLines={5}
            placeholder="Votre message"
            ref={messageRef}
            onFocus={handleFocus}
          />
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleFormSubmit} />
          </View>
        </View>
        <Alert alerte={alerte} />
      </View>
    </ScrollView>
  );
};

export default Contact;
