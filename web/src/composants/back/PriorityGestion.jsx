import {React, useState} from 'react';
import axios from 'axios';


function PriorityGestion({ categories, produits, sortBy, sortOrder }) {
  const [currentCategory, setCurrentCategory] = useState(null);
  

  const handleCategoryClick = (categoryId) => {
    setTimeout(() => setCurrentCategory(categoryId), 0);
  };

  const changePriority = async (productID, newPriority) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API}produits/${productID}.json`, {
          priority: newPriority
      });

      console.log("Priorité mise à jour avec succès", response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la priorité : ", error);
    }
  };
  

  return (
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
                    '▲' 
                )}
            </th>
        </tr>
    </thead>
    <tbody>
        {produits
        .filter(produit => produit.category_id === currentCategory)
        .sort((a, b) => {
          if (sortBy === null) {
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
  );
}

export default PriorityGestion;
