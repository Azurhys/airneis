import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Recherche from './screens/Recherche'
import Accueil from './screens/Accueil';
import Panier from './screens/Panier';
import Parametres from './screens/Parametres'
import Mescommandes from './screens/Mescommandes'
import MentionsLegales from './screens/MentionsLegales'
import Inscription from './screens/Inscription'
import Contact from './screens/Contact'
import Connexion from './screens/Connexion'
import CGU from './screens/CGU'
import APropos from './screens/Apropos';
import Produit from './screens/Produit';
import CartContextProvider from './context/CartContext';
import { AuthContextProvider } from './context/Authcontext';
import Categories from './screens/Categories';

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
    <AuthContextProvider>
    <CartContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Accueil">
          <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
          <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
          <Stack.Screen name="Produit" component={Produit} options={{ headerShown: false }} />
          <Stack.Screen name="Panier" component={Panier} options={{ headerShown: false }} />
          <Stack.Screen name="Recherche" component={Recherche} options={{ headerShown: false }} />
          <Stack.Screen name="Parametres" component={Parametres} options={{ headerShown: false }} />
          <Stack.Screen name="Mescommandes" component={Mescommandes} options={{ headerShown: false }} />
          <Stack.Screen name="MentionsLegales" component={MentionsLegales} options={{ headerShown: false }} />
          <Stack.Screen name="Inscription" component={Inscription} options={{ headerShown: false }} />
          <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
          <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
          <Stack.Screen name="CGU" component={CGU} options={{ headerShown: false }} />
          <Stack.Screen name="APropos" component={APropos} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContextProvider>
    </AuthContextProvider>
  );
}
