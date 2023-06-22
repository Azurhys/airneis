import React, { useEffect, useState } from 'react';
import { Button, View, TextInput, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    setStatusBarHeight(StatusBar.currentHeight);
  }, []);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingTop: statusBarHeight }}>
      <TextInput placeholder="Recherche" />
      <Button 
        title="Panier" 
        onPress={() => navigation.navigate('Panier')} 
      />
    </View>
  );
}