import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Menu from '../composants/Menu';
import styles from '../styles';

export default function Accueil() {
  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <Text>ACCUEIL</Text>
    </SafeAreaView>
  );
}
