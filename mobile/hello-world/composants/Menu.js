import React, { useEffect, useState } from 'react';
import { Button, View, TextInput, StatusBar, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

export default function Menu() {
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    setStatusBarHeight(StatusBar.currentHeight);
  }, []);

  return (
    <View style={[styles.menu, { paddingTop: statusBarHeight }]}>
      <Text style={styles.brand}>ÀIRNEIS</Text>
      <TextInput placeholder="Recherche" />
      <Button 
        title="Panier" 
        onPress={() => navigation.navigate('Panier')} 
      />
    </View>
  );
}