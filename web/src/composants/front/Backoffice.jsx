import React, { useState, useEffect, useRef} from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip,Legend,PieChart,Pie,Cell} from "recharts";
import Histogramme from '../back/Histogramme';
import HistogrammeAvg from '../back/Histogrammeavg';
import Camembert from "../back/Camembert";
import { useProduit } from "../../hook/useProduit";
import './css/StyleBackoffice.css';
import { useCategories } from "../../hook/useCategorie";
import axios from "axios";

const Backoffice = () => {
    const [produits, mettreEnAvantProduit, supprimerProduit, ajouterProduit, produitDetail, afficherDetailProduit, modifierProduit, changeProductPriority] = useProduit();
    const [granularity, setGranularity] = useState("daily");
    const [categoryGranularity, setCategoryGranularity] = useState("daily");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [selectedProduits, setSelectedProduits] = useState([]);
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [editedProduitDetail, setEditedProduitDetail] = useState(null);

    const popupRef = useRef(null);
    const popupRefDetail = useRef(null);
    const popupRefModif = useRef(null);

    const [nouveauProduit, setNouveauProduit] = useState({
      category_id: 0,
      description: "",
      enAvant: 0,
      image: [""],
      name: "",
      price: "",
      product_id: "",
      quantity: 0,
    });

    const [ModifProduit, setModifProduit] = useState({
      category_id: 0,
      description: "",
      image: [""],
      name: "",
      price: "",
      quantity: 0,
    });
    
    const [categories] = useCategories();
    const [sortedProduits, setSortedProduits] = useState([...produits]);

useEffect(() => {
    const newSortedProduits = [...produits].sort((a, b) => {
        if (sortBy === null) {
            // Tri par défaut sur l'ID du produit en ordre ascendant
            return a.product_id - b.product_id;
        }
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
        return 0;
    });
    setSortedProduits(newSortedProduits);
}, [sortBy, sortOrder, produits]);

    const handleSort = (colName) => {
        if (sortBy === colName) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
        setSortBy(colName);
        setSortOrder('asc');
        }
    };

    const handleSelect = (produitId) => {
        if (selectedProduits.includes(produitId)) {
        setSelectedProduits(selectedProduits.filter((id) => id !== produitId));
        } else {
        setSelectedProduits([...selectedProduits, produitId]);
        }
    };

    const onClosePopup = () => {
      if (popupRef.current) {
        popupRef.current.style.display = 'none';
      }
    };
    const onClosePopupDetail = () => {
      if (popupRefDetail.current) {
        popupRefDetail.current.style.display = 'none';
      }
      setShowProductDetails(false);
    };
    const onClosePopupModif = () => {
      if (popupRefModif.current) {
        popupRefModif.current.style.display = 'none';
      }
      setEditedProduitDetail(false);
    };

    // ajout produit
    const onProduitCreate = (e) => {
      //e.preventDefault();
      if (popupRef.current) {
        popupRef.current.style.display = 'block';
      }
    };

    // Supprime un produit
    const onProduitDelete = (produitId) => {
      supprimerProduit(produitId);
    };

    // mettre le produit en avant sur la page acceuil
    const handleMettreEnAvant = (produit) => {
      mettreEnAvantProduit(produit);
    };

    //detail
    const onProduitDetails = (produitId) => {
      afficherDetailProduit(produitId);
      if (popupRefDetail.current) {
        popupRefDetail.current.style.display = 'block';
      }
      setShowProductDetails(true);
    }

    //modif produit
    const onProduitEdit = (produitId) => {
      const produit = produits.find((p) => p.id === produitId);
      setModifProduit({ ...produit});
      afficherDetailProduit(produitId);
      if (popupRefModif.current) {
        popupRefModif.current.style.display = 'block';
      }
      setEditedProduitDetail(true)
    }

  const handleCategoryClick = (categoryId) => {
    // setCurrentCategory(null); // Réinitialise la catégorie actuelle
    setTimeout(() => setCurrentCategory(categoryId), 0); // Puis définis la nouvelle catégorie après une pause
  };
  
  const handleProductPriorityChange = (produitId, newPriority) => {
    changeProductPriority(produitId, newPriority);
}   ;
  
    async function changePriority(productID, newPriority) {
      try {
          const response = await axios.patch(`${import.meta.env.VITE_API}produits/${productID}.json`, {
              priority: newPriority
          });

          console.log("Priorité mise à jour avec succès", response.data);
      } catch (error) {
          console.error("Erreur lors de la mise à jour de la priorité : ", error);
      }
    }

  const [currentCategory, setCurrentCategory] = useState(null);
  const filteredProduits = produits.filter((produit) => produit.category_id === currentCategory);

    const dailySalesData = [
        { name: "Jour 1", sales: 4000 },
        { name: "Jour 2", sales: 3000 },
        { name: "Jour 3", sales: 2000 },
        { name: "Jour 4", sales: 2780 },
        { name: "Jour 5", sales: 1890 },
        { name: "Jour 6", sales: 2390 },
        { name: "Jour 7", sales: 3490 }
    ];
    
    const weeklySalesData = [
        { name: "Semaine 1", sales: 24000 },
        { name: "Semaine 2", sales: 21000 },
        { name: "Semaine 3", sales: 20000 },
        { name: "Semaine 4", sales: 27800 },
        { name: "Semaine 5", sales: 23900 }
    ];
    
    const categoryData = [
        { name: "Jour 1", category1: 2400, category2: 1300, category3: 980 },
        { name: "Jour 2", category1: 1398, category2: 980, category3: 390 },
        { name: "Jour 3", category1: 980, category2: 390, category3: 200 },
        { name: "Jour 4", category1: 390, category2: 200, category3: 480 },
        { name: "Jour 5", category1: 480, category2: 290, category3: 380 },
        { name: "Jour 6", category1: 290, category2: 480, category3: 430 },
        { name: "Jour 7", category1: 480, category2: 380, category3: 430 }
    ];
    
    const weeklyCategoryData = [
        { name: "Semaine 1", category1: 13980, category2: 6980, category3: 4390 },
        { name: "Semaine 2", category1: 12980, category2: 7780, category3: 4390 },
        { name: "Semaine 3", category1: 9980, category2: 6390, category3: 3200 },
        { name: "Semaine 4", category1: 13980, category2: 27800, category3: 9480 },
        { name: "Semaine 5", category1: 11980, category2: 23900, category3: 8430 }
    ];
      
    const pieChartData = [
        { name: "Catégorie 1", value: 400 },
        { name: "Catégorie 2", value: 300 },
        { name: "Catégorie 3", value: 200 },
        { name: "Catégorie 4", value: 100 }
    ];

    return ( 
    <div className="m-5">
        <div className="d-flex w-100">
        <table  className="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th onClick={() => handleSort('product_id')}>
              ID 
              {sortBy === 'product_id' ? (
                  sortOrder === 'asc' ? '▲' : '▼'
              ) : (
                  '▲' // flèche par défaut indiquant un tri ascendant
              )}
          </th>
          <th onClick={() => handleSort('name')}>Nom {sortBy === 'name' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
          <th>Description</th>
          <th onClick={() => handleSort('price')}>Prix {sortBy === 'price' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
          <th onClick={() => handleSort('quantity')}>Quantité {sortBy === 'quantity' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
          <th>Catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {sortedProduits.map((produit) => (
            <tr key={produit.product_id}>
                <td>
                <input
                  type="checkbox"
                  checked={selectedProduits.includes(produit.product_id)}
                  onChange={() => handleSelect(produit.product_id)}
                />
              </td>
              <td>{produit.product_id}</td>
              <td>{produit.name}</td>
              <td>{produit.description}</td>
              <td>{produit.price}</td>
              <td>{produit.quantity}</td>
              <td>{produit.category_id}</td>
              <td>
                <button className="btn btn-danger mx-2" onClick={() => onProduitDelete(produit.product_id)}>Supprimer</button>
                <button className="mx-2 btn btn-brown" onClick={() => onProduitDetails(produit.product_id)}>Détails</button>
                <button className="mx-2 btn btn-warning" onClick={() => onProduitEdit(produit.product_id)}>Modifier</button>
                <button onClick={() => handleMettreEnAvant(produit)} className={produit.enAvant ? "mx-2 btn btn-danger" : "mx-2 btn btn-success"}>{produit.enAvant ? "- vedette" : "+ vedette"}</button>
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
                <td colSpan={7}>
                    <button className="mx-2 btn btn-success" onClick={(e) => onProduitCreate(e)}>Créer un produit</button>
                    {selectedProduits.length > 0 && (
                    <button className="btn btn-danger mx-2" onClick={() => {
                        selectedProduits.forEach((produitId) => {
                        const produitToDelete = produits.find((produit) => produit.product_id === produitId);
                        if (produitToDelete) onProduitDelete(produitToDelete);
                        });
                        setSelectedProduits([]);
                    }}>
                        Supprimer les produits sélectionnés ({selectedProduits.length})
                    </button>
                    )}
                </td>
            </tr>
        </tfoot>
    </table>
    </div>
    <div className="w-100">
                <h2 className="my-3 text-center">Gestion de la priorité des produits par catégorie</h2>
                <br />
                <div className="text-center">
                    {categories.map((category) => (
                      <button
                        key={category.category_id}
                        className="btn btn-brown mx-2"
                        onClick={() => handleCategoryClick(category.category_id)}
                      >
                        {category.name}
                      </button>
                    ))}
                </div>
                <table className="table table-striped">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Catégorie</th>
            <th onClick={() => handleSort('priority')}>
                Priorité 
                {sortBy === 'priority' ? (
                    sortOrder === 'asc' ? '▲' : '▼'
                ) : (
                    '▲' // flèche par défaut indiquant un tri ascendant
                )}
            </th>
        </tr>
    </thead>
    <tbody>
        {produits
        .filter(produit => produit.category_id === currentCategory)
        .sort((a, b) => {
          if (sortBy === null) {
            // Tri par défaut sur l'ID du produit en ordre ascendant
            return a.product_id - b.product_id;
        }
            if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
            if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
            return 0;
        })
        .map((produit) => (
            <tr key={produit.product_id}>
                <td>{produit.product_id}</td>
                <td>{produit.name}</td>
                <td>{produit.description}</td>
                <td>{produit.price}</td>
                <td>{produit.quantity}</td>
                <td>{produit.category_id}</td>
                <td>
                    <p>Priorité actuelle : <span id={`priorityValue${produit.product_id}`}>{produit.priority}</span></p>
                    <div className="d-flex flex-nowrap">
                    <input className="form-control mx-3 w-25" type="number" id={`newPriority${produit.product_id}`} min="1" />
                    <button className="btn btn-brown w-50" onClick={() => changePriority(produit.product_id, document.getElementById(`newPriority${produit.product_id}`).value)}>Changer la priorité</button>
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
</table>


    </div>
        <h1>Tableau de bord</h1>
        <div>
            <h2 className="my-3">Ventes totales</h2>    
                <Histogramme data={granularity === "daily" ? dailySalesData : weeklySalesData} granularity={granularity} />
                <button className="btn btn-brown mx-2" onClick={() => setGranularity("daily")}>Journalier</button>
                <button className="btn btn-brown mx-2" onClick={() => setGranularity("weekly")}>Hebdomadaire</button>
            <h2 className="my-3"> Paniers moyens par catégorie</h2>
                <HistogrammeAvg data={categoryGranularity === "daily" ? categoryData : weeklyCategoryData} granularity={categoryGranularity} />
                <button className="btn btn-brown mx-2" onClick={() => setCategoryGranularity("daily")}>Journalier</button>
                <button className="btn btn-brown mx-2" onClick={() => setCategoryGranularity("weekly")}>Hebdomadaire</button>
            <h2 className="my-3"> Volume de vente par catégorie</h2>
                <Camembert data={pieChartData} />
  </div>

  <div ref={popupRef} className="popup">
    <h2>Nouveau produit</h2>
      <form>
        <div>
          <label htmlFor="category_id">Catégorie :</label>
          <select id="category_id" name="category_id" value={nouveauProduit.category_id} onChange={(e) => setNouveauProduit({ ...nouveauProduit, category_id: e.target.value })}>
            <option value="0">Table</option>
            <option value="1">Chaise</option>
            <option value="2">Canapé</option>
          </select>
        </div>

        <div>
          <label htmlFor="description">Description :</label>
          <input type="text" value={nouveauProduit.description} id="description" name="description" onChange={(e) => setNouveauProduit({...nouveauProduit, description: e.target.value})} />
        </div>

        <div>
          <label htmlFor="images">Images :</label>
          <input type="file" value={nouveauProduit.image} id="images" name="images" onChange={(e) => setNouveauProduit({...nouveauProduit, images: e.target.value})} />
        </div>

        <div>
          <label htmlFor="name">Nom :</label>
          <input type="text" value={nouveauProduit.name} id="name" name="name" onChange={(e) => setNouveauProduit({...nouveauProduit, name: e.target.value})} />
        </div>

        <div>
          <label htmlFor="price">Prix :</label>
          <input type="text" value={nouveauProduit.price} id="price" name="price" onChange={(e) => setNouveauProduit({...nouveauProduit, price: e.target.value})} />
        </div>

        <div>
          <label htmlFor="quantity">Quantité :</label>
          <input type="number" value={nouveauProduit.quantity} id="quantity" name="quantity" onChange={(e) => setNouveauProduit({...nouveauProduit, quantity: e.target.value})} />
        </div>

        <button className="btnpopup" onClick={(e) => {e.preventDefault(); ajouterProduit(nouveauProduit);}}>Créer</button>
      </form>
      <button className="btnpopup" onClick={onClosePopup}>Fermer</button>
  </div>

<div ref={popupRefDetail} className="popup_detail">
  {produitDetail ? (
    <>
      <h2>Détails du produit</h2>
      <p>ID: {produitDetail.product_id}</p>
      <p>Category: {produitDetail.category_id}</p>
      <p>Nom: {produitDetail.name}</p>
      <p>Prix: {produitDetail.price}</p>
      <p>Quantité: {produitDetail.quantity}</p>
    </>
  ) : (
    <p>Chargement des détails du produit...</p>
  )}
  <button onClick={onClosePopupDetail}>Fermer</button>
</div>

<div ref={popupRefModif} className="popupModif">
  {produitDetail ? (
    <>
      <h2>Modifier le produit</h2>
      <input type="number" value={produitDetail.category_id} onChange={(e) => setModifProduit({ ...produitDetail, category_id: e.target.value })} />
      <label>Description: <input type="text" value={produitDetail.description} onChange={(e) => setModifProduit({ ...produitDetail, description: e.target.value })} /></label>
      <label>Images: <input type="text" value={produitDetail.images} onChange={(e) => setModifProduit({ ...produitDetail, images: e.target.value })} /></label>
      <label>Nom: <input type="text" value={produitDetail.name} onChange={(e) => setModifProduit({ ...produitDetail, name: e.target.value })} /></label>
      <label>Prix: <input type="text" value={produitDetail.price} onChange={(e) => setModifProduit({ ...produitDetail, price: e.target.value })} /></label>
      <label>Quantité: <input type="number" value={produitDetail.quantity} id="quantity" name="quantity" onChange={(e) => setModifProduit({ ...produitDetail, quantity: e.target.value })} /></label>




      <button className="mt-3" onClick={() => modifierProduit(produitDetail.product_id)}>Enregistrer</button>
    </>
  ) : (
    <p>Chargement des détails du produit...</p>
  )}
  <button className="close-button" onClick={onClosePopupModif}>Fermer</button>
</div>


    
    </div>
    );
}
 
export default Backoffice;