import React from 'react';
import { View, Text } from 'react-native';
import Menu from '../composants/Menu';
import styles from '../styles';

export default function MesCommandes() {
  return (
    <View style={styles.container}>
      <Menu />
      <Text> Mes Commandes </Text>
    </View>
  );
}
