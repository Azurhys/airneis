import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, Modal , Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity  } from 'react-native';
import Menu from '../composants/Menu';
import styles from '../styles';
import { useProduit } from "../hook/useProduit";
import { Checkbox } from 'react-native-paper';
import { useNavigation} from '@react-navigation/native';

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
  const navigation = useNavigation();

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
    setShowOptions(false);
    setFilteredProducts(filteredProducts.slice(0, 6));
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
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                <View style={styles.btnContainer}>
                  <Button title="Filtrer" onPress={handleFilterClick} color="#BDA18A"/>
                </View>
                <View style={styles.btnContainer}>
                  <Button title="Rechercher" onPress={handleSearchClick} color="#BDA18A"/>
                </View>
              </View>

            <Modal visible={showOptions} animationType="slide">
              <View style={styles.modalContainer}>
                
                  <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={searchTextDescription}
                        onChangeText={handleDescriptionTextChange}
                      />
                  </View>
                  <View style={styles.searchContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Matériau"
                      value={material}
                      onChangeText={handleMaterialChange}
                    />
                  </View>
                  <View style={styles.searchContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Prix min."
                      keyboardType="numeric"
                      value={minPrice}
                      onChangeText={handleMinPriceChange}
                    />
                  </View>
                  <View style={styles.searchContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Prix max."
                      keyboardType="numeric"
                      value={maxPrice}
                      onChangeText={handleMaxPriceChange}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text>Produits uniquement en stock :</Text>
                    <Checkbox
                      status={inStockOnly ? 'checked' : 'unchecked'}
                      onPress={() => handleInStockOnlyChange(!inStockOnly)}
                    />
                  </View>
                  <Text>Trier par</Text>
                  <View style={styles.inputContainer}>
                    <View style={styles.btnContainer}>
                      <Button title="Réinitialiser" onPress={handleResetClick} color="#BDA18A" />
                    </View>
                    <View style={styles.btnContainer}>  
                      <Button title="Fermer" onPress={handleCloseClick} color="#BDA18A"/>
                    </View>
                    <View style={styles.btnContainer}>
                      <Button title="Rechercher" onPress={handleSearchClick} color="#BDA18A"/>
                    </View>
                  </View>
              </View>
            </Modal>
            <View style={styles.cartItemContainer}>
              {filteredProducts.slice(0, 6).map((produit) => (
                <TouchableOpacity
                  key={produit.id}
                  onPress={() => navigation.navigate('Produit', { productId: produit.id })}
                >
                  <View style={styles.card}>
                    <Image source={{ uri: produit.image[0] }} style={styles.image} />
                    <View style={styles.cartItemDetails}>
                      <Text style={styles.subTitleRecherche}>{produit.name}</Text>
                      <Text style={styles.subTitleRecherche}>
                        {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(produit.price)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

