import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Menu from '../composants/Menu';

import { useProduit } from "../hook/useProduit";

export default function Recherche() {
  const [produits, mettreEnAvantProduit, supprimerProduit, ajouterProduit, produitDetail, afficherDetailProduit, modifierProduit, changeProductPriority] = useProduit();
  const [showOptions, setShowOptions] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchTextDescription, setSearchDescriptionText] = useState('');
  const [material, setMaterial] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('price-asc');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleDescriptionTextChange = (text) => {
    setSearchDescriptionText(text);
  };

  const handleMaterialChange = (text) => {
    setMaterial(text);
  };

  const handleMinPriceChange = (text) => {
    setMinPrice(text);
  };

  const handleMaxPriceChange = (text) => {
    setMaxPrice(text);
  };

  const handleCategoriesChange = (selectedCategories) => {
    setCategories(selectedCategories);
  };

  const handleInStockOnlyChange = (checked) => {
    setInStockOnly(checked);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const handleFilterClick = () => {
    setShowOptions(!showOptions);
  };

  const handleSearchClick = () => {
    let filteredProducts = produits.filter((produit) =>
      produit.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Appliquer les filtres
    if (material !== '') {
      filteredProducts = filteredProducts.filter((produit) =>
        produit.material.toLowerCase().includes(material.toLowerCase())
      );
    }

    if (minPrice !== '') {
      filteredProducts = filteredProducts.filter((produit) => produit.price >= parseInt(minPrice));
    }

    if (maxPrice !== '') {
      filteredProducts = filteredProducts.filter((produit) => produit.price <= parseInt(maxPrice));
    }

    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((produit) =>
        categories.includes(produit.category_id)
      );
    }

    if (inStockOnly) {
      filteredProducts = produits.filter((produit) => produit.quantity > 0);
    }

    if (sortBy === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'date-asc') {
      filteredProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'date-desc') {
      filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Ajouter description
    if (searchTextDescription !== '') {
      filteredProducts = filteredProducts.filter((produit) =>
        produit.description.toLowerCase().includes(searchTextDescription.toLowerCase())
      );
    }

    setFilteredProducts(filteredProducts.slice(0, 3));
  };

  const handleResetClick = () => {
    setSearchText('');
    setMaterial('');
    setMinPrice('');
    setMaxPrice('');
    setCategories([]);
    setInStockOnly(false);
    setSortBy('price-asc');
    setSearchDescriptionText('');
  };

  const handleCloseClick = () => {
    setShowOptions(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Menu />
      <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.touchableContainer}>
        <View style={styles.contentContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher un produit..."
          value={searchText}
          onChangeText={handleSearchTextChange}
        />
        <Button title="Filtrer" onPress={handleFilterClick} />
        <Button title="Rechercher" onPress={handleSearchClick} />
      </View>

      {showOptions && (
        <View style={styles.optionsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={searchTextDescription}
            onChangeText={handleDescriptionTextChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Matériau"
            value={material}
            onChangeText={handleMaterialChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Prix min."
            keyboardType="numeric"
            value={minPrice}
            onChangeText={handleMinPriceChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Prix max."
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={handleMaxPriceChange}
          />
          <Text>Catégories</Text>
          <TextInput
            style={styles.input}
            placeholder="Afficher uniquement les produits en stock"
            value={inStockOnly ? 'true' : 'false'}
            onChangeText={handleInStockOnlyChange}
          />
          <Text>Trier par</Text>
          <Button title="Réinitialiser" onPress={handleResetClick} />
          <Button title="Fermer" onPress={handleCloseClick} />
          <Button title="Rechercher" onPress={handleSearchClick} />
        </View>
      )}

      {filteredProducts.slice(0, 3).map((produit) => (
        <View key={produit.id} style={styles.card}>
          {produit.image.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
          <View style={styles.cardBody}>
            <Text style={styles.title}>{produit.name}</Text>
            <Text style={styles.description}>{produit.description}</Text>
            <Text style={styles.text}>Matériau: {produit.material}</Text>
            <Text style={styles.text}>Prix: {produit.price}</Text>
            <Text style={styles.text}>
              {produit.inStock ? 'En stock' : 'En rupture de stock'}
            </Text>
          </View>
        </View>
      ))}
      </View>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableContainer: {//quand on clic en dehors des input ferme le texte
    flex: 1,
  },
  contentContainer: {//quand on clic en dehors des input ferme le texte
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  optionsContainer: {
    position: 'absolute',
    start: '50%',
    width: '50%',
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10,
    zIndex: 1,
  },
  
  card: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
  },
});
