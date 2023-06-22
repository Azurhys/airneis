import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Accueil from './screens/Accueil';
import Panier from './screens/Panier';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
        <Stack.Screen name="Panier" component={Panier} options={{ headerShown: false }} />
        {/* Mettez vos autres écrans ici */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
