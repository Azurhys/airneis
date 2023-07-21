import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, StatusBar, Text, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/Authcontext';

export default function Menu() {
  const navigation = useNavigation();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    setStatusBarHeight(StatusBar.currentHeight);
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
  
    <View style={[styles.menu, { paddingTop: statusBarHeight }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
          <Text style={styles.brand}>AIRNEIS</Text>
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('Recherche')}>
            <Ionicons name="search" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Panier')}>
            <Ionicons name="cart" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={menuVisible}
        >
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
              <Text style={styles.brand}>AIRNEIS</Text>
            </TouchableOpacity>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => navigation.navigate('Recherche')}>
                <Ionicons name="search" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Panier')}>
                <Ionicons name="cart" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleMenu}>
                <Ionicons name="menu" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
                {isAuthenticated ?
                  <>
                  <TouchableOpacity onPress={() => {navigation.navigate('Mescommandes'); toggleMenu();}}>
                    <Text style={styles.modalText}>Mes Commandes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {logout(); toggleMenu();}}>
                    <Text style={styles.modalText}>Se déconnecter</Text>
                  </TouchableOpacity>
                  </>
                  :
                  <>
                    <TouchableOpacity onPress={() => {navigation.navigate('Connexion'); toggleMenu();}}>
                      <Text style={styles.modalText}>Connexion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('Inscription'); toggleMenu();}}>
                      <Text style={styles.modalText}>Inscription</Text>
                    </TouchableOpacity>
                  </>
                }

              <TouchableOpacity onPress={() => {navigation.navigate('CGU'); toggleMenu();}}>
                <Text style={styles.modalText}>CGU</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate('MentionsLegales'); toggleMenu();}}>
                <Text style={styles.modalText}>Mentions Legales</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate('Contact'); toggleMenu();}}>
                <Text style={styles.modalText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {navigation.navigate('APropos'); toggleMenu();}}>
                <Text style={styles.modalText}>A propos d'ÀIRNEIS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </View>
  );
}
