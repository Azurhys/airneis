import Menu from '../composants/Menu';
import styles from '../styles';
import React, { useContext } from 'react';
import { View, Text, Image, Button, Dimensions, ScrollView } from 'react-native';
import Caroussel from "../composants/Caroussel";
import { useProduit } from "../hook/useProduit";
import { RecommandationsProduits } from "../composants/Recommandations";
import { useNavigation, useRoute } from '@react-navigation/native';
import { CartContext } from "../context/CartContext";

const { width: viewportWidth } = Dimensions.get('window');

const Produit = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [produits] = useProduit();
    const  id  = 1;
    const { addToCart } = useContext(CartContext);
    const produitId = Number(id);

    let PanierAchat = "";
    if (produits && produits.length > 0) {
        if (produits[produitId].quantity > 0){
            PanierAchat = "Acheter maintenant";
        } else {
            PanierAchat = "Stock Épuisé";
        }
    }

    let produit;
    if (produits && produits.length > 0) {
        produit = produits.find((p) => p.product_id === produitId);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Menu />
            <Image 
                source={{ uri: produit?.image[1] }} 
                style={{ width: viewportWidth, height: 200 }} 
            />

            <Caroussel images={produit?.image} style={400} />

            <Text style={styles.title}>
                {produit?.name}
            </Text>
            <Text style={styles.price}>
                {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(produit?.price)}
            </Text>
            <Text style={styles.status}>
                {produit?.quantity > 0 ? 'En Stock' : 'Stock Épuisé'}
            </Text>
            <Text style={styles.description}>
                {produit?.description}
            </Text>
            <Button 
                title={PanierAchat} 
                onPress={() => addToCart(produit)} 
                disabled={produit?.quantity > 0 ? false : true}
            />

            <Text style={styles.subTitle}>
                Produits Similaires
            </Text>

            <RecommandationsProduits produits={produits} produit={produit} />
        </ScrollView>
    );
}


export default Produit;

