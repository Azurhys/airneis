import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import { AuthContext } from '../context/Authcontext';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const Menu = () => {
  const navigation = useNavigation();
  const { isAuthenticated, userName, logout, categorie_user_Id } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const menuItemsAuthenticated = [
    {label: 'Mes paramètres', value: 'settings'},
    {label: 'Mes commandes', value: 'Mescommande'},
    // Continuez avec le reste de vos éléments de menu
  ];

  const menuItemsGuest = [
    {label: 'Se Connecter', value: 'connexion'},
    {label: 'S\'inscrire', value: 'inscription'},
    // Continuez avec le reste de vos éléments de menu
  ];

  return (
    <View>
      <View>
        {/* Remplacer 'navigateToPage' par la logique de navigation de votre application */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text>AIRNEIS</Text>
        </TouchableOpacity>
        <View>
          {isAuthenticated && <Text>Bienvenue {userName}</Text>}
          <TouchableOpacity onPress={() => navigation.navigate('Recherche')}>
            <Image source={'https://picsum.photos/50/50?random=1'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Panier')}>
            <Image source={'https://picsum.photos/50/50?random=1'} />
          </TouchableOpacity>
        </View>
        <DropDownPicker
          items={isAuthenticated ? menuItemsAuthenticated : menuItemsGuest}
          onChangeItem={item => navigation.navigate(item.value)}
        />
        {isAuthenticated && (
          <Button title="Déconnexion" onPress={handleLogout} />
        )}
      </View>
    </View>
  );
};

export default Menu;
