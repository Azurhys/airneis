import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, Button, ActivityIndicator  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCategories } from "../hook/useCategories";
import { useProduit } from "../hook/useProduit";
import styles from '../styles';
import Menu from '../composants/Menu';

const Categories = () => {
    
    const [produits] = useProduit();    
    const navigation = useNavigation();
    const route = useRoute();
    const category_id = 0;
    
    const [categories, setCategories, isLoading] = useCategories();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

    // Ajouter cette vérification
    let produitsParCategorie = [];
    let sortedProduits = [];
    
    if (produits && produits.length > 0) {
      produitsParCategorie = produits.filter(p => p.category_id === Number(category_id));
      sortedProduits = [...produitsParCategorie].sort((a, b) => {
        if (a.quantity === 0) return 1; 
        if (b.quantity === 0) return -1; 
        return b.priority - a.priority; 
      });
    }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Produit', { productId: item.product_id })}>
      <View style={styles.cartItemContainer}>
        <Image source={{ uri: item.image[0] }} style={styles.imageProduit} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.subTitle}>{item.name}</Text>
          <Text style={styles.subTitle}>
            {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(item.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
      <View style={{ alignItems: 'center'}}>
        <Image source={{ uri: categories[category_id].image }} style={styles.image} />
        <Text style={styles.subTitle}>{categories[category_id].description}</Text>
      </View>

      <FlatList
        data={sortedProduits}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={renderItem}
      />
    </ScrollView>
  )
}

export default Categories;
