import React, { useState } from 'react';


const ProduitsGestion = ({ categories, produits, sortBy, sortOrder, handleSelect, handleSort, onProduitDelete, onProduitDetails, onProduitEdit, handleMettreEnAvant, selectedProduits, setSelectedProduits }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = produits.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(produits.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="d-flex w-100">
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th onClick={() => handleSort('product_id')}>
                ID 
                {sortBy === 'product_id' ? (
                    sortOrder === 'asc' ? '▲' : '▼'
                ) : (
                    '▲' 
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
        {currentProducts.map((produit) => (

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
        <div className="pagination">
          {pageNumbers.map(number => (
            <button key={number} onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          ))}
        </div>
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
  );
};

export default ProduitsGestion;
