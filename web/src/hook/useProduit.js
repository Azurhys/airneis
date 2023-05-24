import { useState, useEffect } from "react";
import axios from "axios";

export function useProduit() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}produits.json`).then((reponse) => {
      const resultat = [];
      for (const key in reponse.data) {
        if (reponse.data[key]) resultat.push({ ...reponse.data[key], id: key });
      }
      setProduits(resultat);
    });
  }, []);

  const mettreEnAvantProduit = (produit) => {
    const produitsEnAvant = produits.filter((p) => p.enAvant === 1);

    if (produit.enAvant === 0 && produitsEnAvant.length >= 3) {
      alert("La limite de produits en vedette est atteinte !");
      return;
    }
    const updatedProduits = produits.map((p) => {
      if (p.id === produit.id) {
        const updatedProduit = { ...p, enAvant: p.enAvant === 0 ? 1 : 0 };
        // Mettre à jour la valeur "enAvant" dans la base de données
        axios.put(`${import.meta.env.VITE_API}produits/${p.id}.json`, updatedProduit).then(() => {console.log("Produit mis à jour avec succès !");})
          .catch((error) => {console.error("Erreur lors de la mise à jour du produit :", error);});
        return updatedProduit;
      }
      return p;
    });

    setProduits(updatedProduits);
  };

  const changeProductPriority = (product_id, newPriority) => {
    const productRef = database.ref(`produits/${product_id}`);
    productRef.update({ priority: newPriority });
  };


  return [produits, mettreEnAvantProduit, changeProductPriority];
}
