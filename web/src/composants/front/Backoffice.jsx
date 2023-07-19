import React, { useState, useEffect, useRef, useContext} from "react";
import { useNavigate } from "react-router-dom";
import Histogramme from '../back/Histogramme';
import HistogrammeAvg from '../back/Histogrammeavg';
import Camembert from "../back/Camembert";
import { useProduit } from "../../hook/useProduit";
import './css/StyleBackoffice.css';
import { useCategories } from "../../hook/useCategorie";
import { useCommandes } from "../../hook/useCommandes";
import moment from 'moment';
import PriorityGestion from "../back/PriorityGestion";
import ProduitsGestion from "../back/ProduitsGestion";
import useContact from "../../hook/useContact";
import { AuthContext } from "../../context/Authcontext";
import { useCarouselImages } from "../../hook/useCarousel";

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
    const { messages } = useContact();
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [images, updateImage] = useCarouselImages();
    const [newImageUrls, setNewImageUrls] = useState([]);
    const [showInput, setShowInput] = useState([]);
    // Ajoutez un nouvel état pour la page courante des messages
    const [currentMessagePage, setCurrentMessagePage] = useState(1);

    // Définissez le nombre de messages par page
    const messagesPerPage = 5;

    // Calculer les index du premier et du dernier message pour la page actuelle
    const indexOfLastMessage = currentMessagePage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;

    // Extraire les messages pour la page actuelle
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

    // Calculer le nombre total de pages
    const messagePageNumbers = [];
    for (let i = 1; i <= Math.ceil(messages.length / messagesPerPage); i++) {
      messagePageNumbers.push(i);
    }

    const handleShowInput = (index) => {
      setShowInput({ ...showInput, [index]: !showInput[index] });
    };

    const handleUpdateImage = (index) => {
      const newImage = newImageUrls[index] || '';
      updateImage(index, newImage);
      setNewImageUrls({ ...newImageUrls, [index]: '' });
    };

    const handleImageUrlChange = (index, newUrl) => {
      setNewImageUrls({ ...newImageUrls, [index]: newUrl });
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/connexion", { state: { from: "/backoffice" } });
        }
      }, [isAuthenticated, navigate]);

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
    
    const [categories, setCategories, updateCategory] = useCategories();
    const [sortedProduits, setSortedProduits] = useState([...produits]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [updatedCategory, setUpdatedCategory] = useState({});

    const handleEdit = (category) => {
      setEditingCategory(category.id);
      setUpdatedCategory(category);
    };
  
    const handleUpdate = () => {
      updateCategory(editingCategory, updatedCategory);
      setEditingCategory(null);
    };

useEffect(() => {
  setModifProduit(produitDetail);
  console.log(ModifProduit)
    const newSortedProduits = [...produits].sort((a, b) => {
        if (sortBy === null) {
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


    const onProduitCreate = (e) => {
      if (popupRef.current) {
        popupRef.current.style.display = 'block';
      }
    };


    const onProduitDelete = (produitId) => {
      supprimerProduit(produitId);
    };


    const handleMettreEnAvant = (produit) => {
      mettreEnAvantProduit(produit);
    };


    const onProduitDetails = (produitId) => {
      afficherDetailProduit(produitId);
      if (popupRefDetail.current) {
        popupRefDetail.current.style.display = 'block';
      }
      setShowProductDetails(true);
    }


    const onProduitEdit = (produitId) => {
      const produit = produits.find((p) => p.id === produitId);
      setModifProduit({ ...produit});
      afficherDetailProduit(produitId);
      if (popupRefModif.current) {
        popupRefModif.current.style.display = 'block';
      }
      setEditedProduitDetail(true)
    }

  const today = moment();
    const days = [6, 5, 4, 3, 2, 1, 0].map(n => moment(today).subtract(n, 'days'));  
    const dailySalesData = days.map((day, i) => {
      const totalSales = commandes.reduce((acc, commande) => {
        const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
        return day.isSame(orderDate, 'day') ? acc + parseFloat(commande.cartItems.total) : acc;
      }, 0);

      return { name: day.format('DD/MM'), ventes: totalSales }; 
    });

    const weeks = [4, 3, 2, 1, 0].map(n => {
      const startOfWeek = moment().subtract(n, 'weeks').startOf('week');
      return {
        start: startOfWeek,
        end: moment(startOfWeek).endOf('week')
      };
    });
    
    const weeklySalesData = weeks.map((week, i) => {
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
      for (let j = 0; j <= 5; j++) {
        daySales[categoryMap[j]] = 0;
      }
    
      return daySales;
    });

    for (const commande of commandes) {
      const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
      for (const item of commande.cartItems.cart) {
        if (item.category_id >= 0 && item.category_id <= 5) {
          const dayIndex = days.findIndex(day => day.isSame(orderDate, 'day'));
          if (dayIndex !== -1) {
            const sales = item.price * item.quantityInCart;
            dailyCategoryData[dayIndex][categoryMap[item.category_id]] += sales;
          }
        }
      }
    }
    

    
    
    const weeklyCategoryData = weeks.map((week, i) => {
      const weekSales = { name: `Semaine ${i + 1}` };
      for (let j = 0; j <= 5; j++) {
        weekSales[categoryMap[j]] = 0;
      }
    
      return weekSales;
    });
    
    for (const commande of commandes) {
      const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
      for (const item of commande.cartItems.cart) {
        if (item.category_id >= 0 && item.category_id <= 5) {
          const weekIndex = weeks.findIndex(week => orderDate.isSameOrAfter(week.start) && orderDate.isSameOrBefore(week.end));
          if (weekIndex !== -1) {
            const sales = item.price * item.quantityInCart;
            weeklyCategoryData[weekIndex][categoryMap[item.category_id]] += sales;
          }
        }
      }
    }
    
      
    const sevenDaySalesData = days.map((day, i) => {
      const daySales = { name: day.format('DD/MM') };
      for (let j = 0; j <= 5; j++) {
        daySales[categoryMap[j]] = 0;
      }
    
      return daySales;
    });
    
    for (const commande of commandes) {
      const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
      for (const item of commande.cartItems.cart) {
        if (item.category_id >= 0 && item.category_id <= 5) {
          const dayIndex = days.findIndex(day => day.isSame(orderDate, 'day'));
          if (dayIndex !== -1) {
            const sales = item.price * item.quantityInCart;
            sevenDaySalesData[dayIndex][categoryMap[item.category_id]] += sales;
          }
        }
      }
    }

    const totalWeeklySalesData = sevenDaySalesData.reduce((acc, daySales) => {
      for (const category in daySales) {
        if (category !== 'name') {
          if (!acc.hasOwnProperty(category)) {
            acc[category] = 0;
          }
          acc[category] += daySales[category];
        }
      }
      return acc;
    }, {});
    
    const pieChartData = Object.keys(totalWeeklySalesData).map(category => ({
      name: category,
      value: totalWeeklySalesData[category]
    }));
    
    const weeksCategoryData = weeks.map((week, i) => {
      const weekSales = { name: `Week ${i + 1}` };
      for (let j = 0; j <= 5; j++) {
        weekSales[categoryMap[j]] = 0;
      }
    
      return weekSales;
    });

    for (const commande of commandes) {
      const orderDate = moment(commande.orderDate, "DD/MM/YYYY");
    
      for (const item of commande.cartItems.cart) {
        if (item.category_id >= 0 && item.category_id <= 5) {
          const weekIndex = weeks.findIndex(week => orderDate.isBetween(week.start, week.end, 'day', '[]'));
          if (weekIndex !== -1) {
            const sales = item.price * item.quantityInCart;
            weeksCategoryData[weekIndex][categoryMap[item.category_id]] += sales;
          }
        }
      }
    }
    
    const totalFiveWeeksSalesData = weeksCategoryData.reduce((acc, weekSales) => {
      for (const category in weekSales) {
        if (category !== 'name') {
          if (!acc.hasOwnProperty(category)) {
            acc[category] = 0;
          }
          acc[category] += weekSales[category];
        }
      }
      return acc;
    }, {});
    

    const pieChartFiveWeeksData = Object.keys(totalFiveWeeksSalesData).map(category => ({
      name: category,
      value: totalFiveWeeksSalesData[category]
    }));

    return ( 
    <div className="m-5">
        <ProduitsGestion 
          categories={categories}
          produits={sortedProduits}
          sortBy={sortBy}
          sortOrder={sortOrder}
          handleSelect={handleSelect}
          handleSort={handleSort}
          onProduitDelete={onProduitDelete}
          onProduitDetails={onProduitDetails}
          onProduitEdit={onProduitEdit}
          handleMettreEnAvant={handleMettreEnAvant}
          selectedProduits={selectedProduits}
          setSelectedProduits={setSelectedProduits}
        />
        <PriorityGestion 
          categories={categories}
          produits={produits}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
        <div>
          {images.map((src, index) => (
            <div key={index}>
              <img width={500} src={src} />
              <button onClick={() => handleShowInput(index)}>Modifier</button>
              {showInput[index] && (
                <div>
                  <input
                    type="text"
                    value={newImageUrls[index] || ''}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    placeholder="Entrez la nouvelle URL de l'image"
                  />
                  <button onClick={() => handleUpdateImage(index)}>Enregistrer</button>
                </div>
              )}
            </div>
          ))}
        </div>
<div>
      {categories.map((category) => (
        <div key={category.id}>
          {editingCategory === category.id ? (
            <div>
              <input
                type="text"
                value={updatedCategory.name}
                onChange={(e) => setUpdatedCategory(prevCategory => ({ ...prevCategory, name: e.target.value }))}
              />
              <input
                type="text"
                value={updatedCategory.image}
                onChange={(e) => setUpdatedCategory(prevCategory => ({ ...prevCategory, image: e.target.value }))}
              />
              <button onClick={handleUpdate}>Mettre à jour</button>
            </div>
          ) : (
            <div>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
              <button onClick={() => handleEdit(category)}>Éditer</button>
            </div>
          )}
        </div>
      ))}
    </div>
        <h1>Tableau de bord</h1>
        <div>
            <h2>Messages</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Sujet</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                  {currentMessages.map((message, index) => (
                    <tr key={index}>
                      <td>{message.email}</td>
                      <td>{message.sujet}</td>
                      <td>{message.text}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
        <div className="pagination">
          {messagePageNumbers.map(number => (
            <button key={number} onClick={() => setCurrentMessagePage(number)}>
              {number}
            </button>
          ))}
        </div>              
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