import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Caroussel from "../composants/Caroussel";
import { useProduit } from "../hook/useProduit";
import { useCategories } from '../hook/useCategories'
import { useCarouselImages } from '../hook/useCarousel';
import styles from '../styles';
import Menu from '../composants/Menu';

const Accueil = () => {
  const navigation = useNavigation();
  const [produits] = useProduit();
  const [categories] = useCategories();
  const [images] = useCarouselImages();

  // Filtrer les produits en avant
  const produitsEnAvant = produits.filter((produit) => produit.enAvant === 1);

  // Trier les catégories par priorité décroissante
  const categoriesSorted = [...categories].sort((a, b) => b.priority - a.priority);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
      <Caroussel images={images} />
      
      <View>
        {categoriesSorted.map((categorie) => (
          <TouchableOpacity key={categorie.category_id} onPress={() => navigation.navigate('Categories', { categoryId: categorie.category_id })}>
            <Image style={{ width: 300, height: 300 }} source={{ uri: categorie.image }} />
            <Text>{categorie.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text>
        Venant des hautes terres d'Écosse, nos meubles sont immortels
      </Text>
      
      <View>
        {produitsEnAvant.map((produit) => (
          <TouchableOpacity key={produit.id} onPress={() => navigation.navigate('Produit', { productId: produit.id })}>
            <Image style={{ width: 300, height: 300 }} source={{ uri: produit.image[0] }} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Accueil;
