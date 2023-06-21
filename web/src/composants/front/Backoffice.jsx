import React, { useState, useEffect, useRef} from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip,Legend,PieChart,Pie,Cell} from "recharts";
import Histogramme from '../back/Histogramme';
import HistogrammeAvg from '../back/Histogrammeavg';
import Camembert from "../back/Camembert";
import { useProduit } from "../../hook/useProduit";
import './css/StyleBackoffice.css';
import { useCategories } from "../../hook/useCategorie";
import axios from "axios";
import { useCommandes } from "../../hook/useCommandes";
import { startOfWeek, eachDayOfInterval, format } from 'date-fns';
import moment from 'moment';

const Backoffice = () => {
    const [produits, mettreEnAvantProduit, supprimerProduit, ajouterProduit, produitDetail, afficherDetailProduit, modifierProduit, changeProductPriority] = useProduit();
    const [granularity, setGranularity] = useState("daily");
    const [categoryGranularity, setCategoryGranularity] = useState("daily");
    const [camGranularity, setCamGranularity] = useState("daily");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [selectedProduits, setSelectedProduits] = useState([]);
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [editedProduitDetail, setEditedProduitDetail] = useState(null);
    const [commandes] = useCommandes();
    const popupRef = useRef(null);
    const popupRefDetail = useRef(null);
    const popupRefModif = useRef(null);

    const startOfLastWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const daysOfLastWeek = eachDayOfInterval({ start: startOfLastWeek, end: new Date() });
    const DAY_IN_MS = 24 * 60 * 60 * 1000; // 24 heures * 60 minutes * 60 secondes * 1000 millisecondes
    function isSameWeek(date1, date2) {
      // Clone les dates pour éviter les modifications involontaires
      var d1 = new Date(date1);
      var d2 = new Date(date2);
  
      // Définir le jour de la semaine comme dimanche (0) à samedi (6)
      d1.setHours(0, 0, 0, 0);
      d1.setDate(d1.getDate() - d1.getDay());
      d2.setHours(0, 0, 0, 0);
      d2.setDate(d2.getDate() - d2.getDay());
  
      return d1.getTime() === d2.getTime();
  }
  
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
  setModifProduit(produitDetail);
  console.log(ModifProduit)
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
}, [sortBy, sortOrder, produits, produitDetail]);

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


  const today = moment();
    const days = [6, 5, 4, 3, 2, 1, 0].map(n => moment(today).subtract(n, 'days'));  // Inverse order here

    const dailySalesData = days.map((day, i) => {
      // Calculate the total sales for each day
      const totalSales = commandes.reduce((acc, commande) => {
        const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
        return day.isSame(orderDate, 'day') ? acc + parseFloat(commande.cartItems.total) : acc;
      }, 0);

      return { name: day.format('DD/MM'), ventes: totalSales };  // Format the day as 'DD/MM'
    });

    const weeks = [4, 3, 2, 1, 0].map(n => {
      const startOfWeek = moment().subtract(n, 'weeks').startOf('week');
      return {
        start: startOfWeek,
        end: moment(startOfWeek).endOf('week')
      };
    });
    
    const weeklySalesData = weeks.map((week, i) => {
      // Calculate the total sales for each week
      const totalSales = commandes.reduce((acc, commande) => {
        const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
        if (orderDate.isSameOrAfter(week.start) && orderDate.isSameOrBefore(week.end)) {
          return acc + parseFloat(commande.cartItems.total);
        }
        return acc;
      }, 0);
    
      return { name: `Semaine ${i + 1}`, ventes: totalSales };
    });

    const categoryMap = categories.reduce((acc, category) => {
      acc[category.category_id] = category.name;
      return acc;
    }, {});

    const dailyCategoryData = days.map((day, i) => {
      const daySales = { name: day.format('DD/MM') };
    
      // Initialize all category sales as 0
      for (let j = 0; j <= 5; j++) {
        // Use the category name from categoryMap
        daySales[categoryMap[j]] = 0;
      }
    
      return daySales;
    });
    
    // Go through all commandes
    for (const commande of commandes) {
      // Parse order date
      const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
    
      // Go through all items in the cart
      for (const item of commande.cartItems.cart) {
        // Check if the item belongs to one of the categories
        if (item.category_id >= 0 && item.category_id <= 5) {
          // Find the corresponding day
          const dayIndex = days.findIndex(day => day.isSame(orderDate, 'day'));
    
          // If the order date is within the last 7 days
          if (dayIndex !== -1) {
            // Calculate sales for this item
            const sales = item.price * item.quantityInCart;
    
            // Add sales to the corresponding category and day
            // Use the category name from categoryMap
            dailyCategoryData[dayIndex][categoryMap[item.category_id]] += sales;
          }
        }
      }
    }
    

    
    
    const weeklyCategoryData = weeks.map((week, i) => {
      const weekSales = { name: `Semaine ${i + 1}` };
    
      // Initialize all category sales as 0
      for (let j = 0; j <= 5; j++) {
        // Use the category name from categoryMap
        weekSales[categoryMap[j]] = 0;
      }
    
      return weekSales;
    });
    
    // Go through all commandes
    for (const commande of commandes) {
      // Parse order date
      const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
    
      // Go through all items in the cart
      for (const item of commande.cartItems.cart) {
        // Check if the item belongs to one of the categories
        if (item.category_id >= 0 && item.category_id <= 5) {
          // Find the corresponding week
          const weekIndex = weeks.findIndex(week => orderDate.isSameOrAfter(week.start) && orderDate.isSameOrBefore(week.end));
    
          // If the order date is within the last 5 weeks
          if (weekIndex !== -1) {
            // Calculate sales for this item
            const sales = item.price * item.quantityInCart;
    
            // Add sales to the corresponding category and week
            // Use the category name from categoryMap
            weeklyCategoryData[weekIndex][categoryMap[item.category_id]] += sales;
          }
        }
      }
    }
    
      
    const sevenDaySalesData = days.map((day, i) => {
      const daySales = { name: day.format('DD/MM') };
    
      // Initialize all category sales as 0
      for (let j = 0; j <= 5; j++) {
        // Use the category name from categoryMap
        daySales[categoryMap[j]] = 0;
      }
    
      return daySales;
    });
    
    // Go through all commandes
    for (const commande of commandes) {
      // Parse order date
      const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
    
      // Go through all items in the cart
      for (const item of commande.cartItems.cart) {
        // Check if the item belongs to one of the categories
        if (item.category_id >= 0 && item.category_id <= 5) {
          // Find the corresponding day
          const dayIndex = days.findIndex(day => day.isSame(orderDate, 'day'));
    
          // If the order date is within the last 7 days
          if (dayIndex !== -1) {
            // Calculate sales for this item
            const sales = item.price * item.quantityInCart;
    
            // Add sales to the corresponding category and day
            sevenDaySalesData[dayIndex][categoryMap[item.category_id]] += sales;
          }
        }
      }
    }
    
    // Sum sales data over the last 7 days
    const totalWeeklySalesData = sevenDaySalesData.reduce((acc, daySales) => {
      // For each category in the day's sales
      for (const category in daySales) {
        // Skip the 'name' key
        if (category !== 'name') {
          // If this category has not been seen before, initialize its total sales to 0
          if (!acc.hasOwnProperty(category)) {
            acc[category] = 0;
          }
          // Add the day's sales to the total sales for this category
          acc[category] += daySales[category];
        }
      }
      return acc;
    }, {});
    
    // Convert the totalWeeklySalesData object to an array of objects
    const pieChartData = Object.keys(totalWeeklySalesData).map(category => ({
      name: category,
      value: totalWeeklySalesData[category]
    }));
    
    const weeksCategoryData = weeks.map((week, i) => {
      const weekSales = { name: `Week ${i + 1}` };
    
      // Initialize all category sales as 0
      for (let j = 0; j <= 5; j++) {
        // Use the category name from categoryMap
        weekSales[categoryMap[j]] = 0;
      }
    
      return weekSales;
    });

    for (const commande of commandes) {
      // Parse order date
      const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
    
      // Go through all items in the cart
      for (const item of commande.cartItems.cart) {
        // Check if the item belongs to one of the categories
        if (item.category_id >= 0 && item.category_id <= 5) {
          // Find the corresponding week
          const weekIndex = weeks.findIndex(week => orderDate.isBetween(week.start, week.end, 'day', '[]'));
    
          // If the order date is within the last 5 weeks
          if (weekIndex !== -1) {
            // Calculate sales for this item
            const sales = item.price * item.quantityInCart;
    
            // Add sales to the corresponding category and week
            // Use the category name from categoryMap
            weeksCategoryData[weekIndex][categoryMap[item.category_id]] += sales;
          }
        }
      }
    }
    
    const totalFiveWeeksSalesData = weeksCategoryData.reduce((acc, weekSales) => {
      // For each category in the week's sales
      for (const category in weekSales) {
        // Skip the 'name' key
        if (category !== 'name') {
          // If this category has not been seen before, initialize its total sales to 0
          if (!acc.hasOwnProperty(category)) {
            acc[category] = 0;
          }
          // Add the week's sales to the total sales for this category
          acc[category] += weekSales[category];
        }
      }
      return acc;
    }, {});
    
    // Convert the totalFiveWeeksSalesData object to an array of objects
    const pieChartFiveWeeksData = Object.keys(totalFiveWeeksSalesData).map(category => ({
      name: category,
      value: totalFiveWeeksSalesData[category]
    }));

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
                <HistogrammeAvg data={categoryGranularity === "daily" ? dailyCategoryData : weeklyCategoryData} granularity={categoryGranularity} />
                <button className="btn btn-brown mx-2" onClick={() => setCategoryGranularity("daily")}>Journalier</button>
                <button className="btn btn-brown mx-2" onClick={() => setCategoryGranularity("weekly")}>Hebdomadaire</button>
            <h2 className="my-3"> Volume de vente par catégorie</h2>
                <Camembert data={camGranularity === "daily" ? pieChartData : pieChartFiveWeeksData } granularity={camGranularity} />
                <button className="btn btn-brown mx-2" onClick={() => setCamGranularity("daily")}>Journalier</button>
                <button className="btn btn-brown mx-2" onClick={() => setCamGranularity("weekly")}>Hebdomadaire</button>
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
      <input type="number" value={ModifProduit.category_id} onChange={(e) => setModifProduit({ ...produitDetail, category_id: e.target.value })} />
      <label>Description: <input type="text" value={ModifProduit.description} onChange={(e) => setModifProduit({ ...produitDetail, description: e.target.value })} /></label>
      <label>Images: <input type="text" value={ModifProduit.images} onChange={(e) => setModifProduit({ ...produitDetail, images: e.target.value })} /></label>
      <label>Nom: <input type="text" value={ModifProduit.name} onChange={(e) => setModifProduit({ ...produitDetail, name: e.target.value })} /></label>
      <label>Prix: <input type="text" value={ModifProduit.price} onChange={(e) => setModifProduit({ ...produitDetail, price: e.target.value })} /></label>
      <label>Quantité: <input type="number" value={ModifProduit.quantity} id="quantity" name="quantity" onChange={(e) => setModifProduit({ ...produitDetail, quantity: e.target.value })} /></label>

      <button className="mt-3" onClick={() => modifierProduit(ModifProduit)}>Enregistrer</button>
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