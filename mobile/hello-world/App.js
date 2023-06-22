import React from 'react';
import { Button, View, TextInput } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Accueil from './screens/Accueil';  // Vos autres écrans iraient ici

const Drawer = createDrawerNavigator();

function CustomHeader() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TextInput placeholder="Recherche" />
      <Button title="Panier" onPress={() => console.log('Panier pressé')} />
    </View>
  );
}

function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CustomHeader />
      <Accueil /> 
    </View>
  );
}

// Et pour chaque autre écran, vous feriez quelque chose de similaire...

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        {/* Mettez vos autres écrans ici */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
