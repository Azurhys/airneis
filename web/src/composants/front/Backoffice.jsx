import React, { useState, useEffect } from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip,Legend,PieChart,Pie,Cell} from "recharts";
import Histogramme from '../back/Histogramme';
import HistogrammeAvg from '../back/Histogrammeavg';
import Camembert from "../back/Camembert";
import { useProduit } from "../../hook/useProduit";



const Backoffice = () => {
    const [produits, mettreEnAvantProduit] = useProduit()
    const [granularity, setGranularity] = useState("daily");
    const [categoryGranularity, setCategoryGranularity] = useState("daily");
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [selectedProduits, setSelectedProduits] = useState([]);

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

    // Supprime un produit
  const onProduitDelete = (produitToDelete) => {
    const dbRef = firebase.database().ref(`produits/${produitToDelete.product_id}`);
    dbRef.remove();
  };

  // mettre le produit en avant sur la page acceuil
  const handleMettreEnAvant = (produit) => {
    mettreEnAvantProduit(produit);
    console.log("rentre ici")
  };
  

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
          <th onClick={() => handleSort('product_id')}>ID {sortBy === 'product_id' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
          <th onClick={() => handleSort('name')}>Nom {sortBy === 'name' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
          <th>Description</th>
          <th onClick={() => handleSort('price')}>Prix {sortBy === 'price' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
          <th onClick={() => handleSort('quantity')}>Quantité {sortBy === 'quantity' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}</th>
          <th>Catégorie</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {produits
          .sort((a, b) => {
            if (sortBy === null) return 0;
            if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
            if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
            return 0;
          })
          .map((produit) => (
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
                <button className="btn btn-danger mx-2" onClick={() => onProduitDelete(produit)}>Supprimer</button>
                <button className="mx-2 btn btn-brown" onClick={() => onProduitDetails(produit)}>Détails</button>
                <button className="mx-2 btn btn-warning" onClick={() => onProduitEdit(produit)}>Modifier</button>
                <button onClick={() => handleMettreEnAvant(produit)}>Mettre en avant</button>
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
                <td colSpan={7}>
                    <button className="btn btn-success mx-2" onClick={() => onProduitCreate()}>Nouveau produit</button>
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
    </div>
    );
}
 
export default Backoffice;