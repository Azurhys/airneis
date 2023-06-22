import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity , StatusBar, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';

export default function Menu() {
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    setStatusBarHeight(StatusBar.currentHeight);
  }, []);

  return (
    <View style={[styles.menu, { paddingTop: statusBarHeight }]}>
      <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
        <Text style={styles.brand}>ÀIRNEIS</Text>
        </TouchableOpacity>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => navigation.navigate('Recherche')}>
          <Ionicons name="search" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Panier')}>
            <Ionicons name="cart" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Panier')}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}