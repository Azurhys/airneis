import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Accueil from './screens/Accueil';
import Panier from './screens/Panier';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Recherche from './screens/Recherche'


const Stack = createStackNavigator();

const loadFonts = () => {
  return Font.loadAsync({
    'Cinzel-Bold': require('./assets/fonts/Cinzel-Bold.ttf'), // Replace with the path to your font file
  });
}

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Empêcher le masquage automatique de l'écran de démarrage
        await SplashScreen.preventAutoHideAsync();

        // Charger les ressources
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);

        // Masquer l'écran de démarrage
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
        <Stack.Screen name="Panier" component={Panier} options={{ headerShown: false }} />
        <Stack.Screen name="Recherche" component={Recherche} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
