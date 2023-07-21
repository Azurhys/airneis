import { useState, useEffect } from "react";
import axios from "axios";

export function useProduit() {
  const [produits, setProduits] = useState([]);
  const [produitDetail, setProduitDetail] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}produits.json`).then((reponse) => {
      const resultat = [];
      for (const key in reponse.data) {
        if (reponse.data[key]) resultat.push({ ...reponse.data[key], id: key });
      }
      setProduits(resultat);
    });
  }, []);
  
  //mettre en avant
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

  const changeProductPriority = (produitId, newPriority) => {
    setProduits((prevProduits) => {
        return prevProduits.map((produit) => {
            if (produit.product_id === produitId) {
                return { ...produit, priority: newPriority };
            }
            return produit;
        });
    });
};

  //supprimer
  const supprimerProduit = (produitId) => {
    console.log(typeof produitId);
    axios.delete(`${import.meta.env.VITE_API}produits/${produitId}.json`).then(() => {
        setProduits((prevProduits) => prevProduits.filter((produit) => produit.id !== produitId));
        console.log(`Produit avec ID ${produitId} supprimé avec succès.`);
      })
      .catch((error) => {
        console.error(`Erreur lors de la suppression du produit avec ID ${produitId}:`, error);
      });
  };

// Ajouter un produit
const ajouterProduit = (nouveauProduit) => {
  const nombreProduits = produits.length;
  const nouveauProductID = nombreProduits + 1;

  const produit = { ...nouveauProduit, product_id: nouveauProductID };
  const firebaseKey = nouveauProductID.toString(); // Utilisez nouveauProductID comme clé

  axios.put(`${import.meta.env.VITE_API}produits/${firebaseKey}.json`, produit).then((response) => {
    const nouveauProduitAvecId = { ...produit, id: firebaseKey };
    setProduits((prevProduits) => [...prevProduits, nouveauProduitAvecId]);
    console.log("Produit ajouté");
  })
  .catch((error) => {
    console.error("Erreur lors de l'ajout du produit :", error);
  });
};



  

  // Detail produit
  const afficherDetailProduit = (produitId) => {
    axios.get(`${import.meta.env.VITE_API}produits/${produitId}.json`).then(response => {
        const produit = response.data;
        console.log(produit)
        setProduitDetail(produit);
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération des détails du produit avec ID ${produitId}:`, error);
      });
  };

  // Modifier un produit
  const modifierProduit = (produitModifie) => {
    const produit = {...produitModifie,product_id: parseInt(produitModifie.product_id, 10)};
    console.log("Produit à modifier:", produit); // Pour vérifier le produit
    
    axios.patch(`${import.meta.env.VITE_API}produits/${produit.product_id}.json`, produit)
      .then(() => {
        setProduits((prevProduits) => {
          const index = prevProduits.findIndex((p) => p.product_id === produit.product_id);
          if (index !== -1) {
            const produitsCopies = [...prevProduits];
            produitsCopies[index] = produit;
            return produitsCopies;
          }
          return prevProduits;
        });
        console.log("Produit modifié");
      })
      .catch((error) => {
        console.error("Erreur", error);
      });
  };

  
  


  return [produits, mettreEnAvantProduit, supprimerProduit, ajouterProduit, produitDetail, afficherDetailProduit, modifierProduit, changeProductPriority];
}
