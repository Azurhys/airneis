import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

export const RecommandationsProduits = ({ produits, produit }) => {
    const navigation = useNavigation();

    const produitsSimilaires = produits.filter(
        (p) => p.category_id === produit.category_id && p.product_id !== produit.product_id
      );
    
    const produitsSimilairesAleatoires = produitsSimilaires.sort(() => Math.random() - 0.5);
    const sixProduitsSimilaires = produitsSimilairesAleatoires.slice(0, 6);
  
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {sixProduitsSimilaires.map((p) => (
            <View key={p.product_id} style={{flex: 1}}>
                <TouchableOpacity onPress={() => navigation.navigate('Product', {productId: p.product_id})}>
                    <Image source={{uri: p.image[0]}} style={{width: '100%', height: undefined, aspectRatio: 1}} />
                </TouchableOpacity>
            </View>
        ))}
      </ScrollView>
    );
};