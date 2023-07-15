import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useProduit } from "../../hook/useProduit";

const Recherche = () => {
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

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDescriptionTextChange = (event) => {
    setSearchDescriptionText(event.target.value);
  };

  const handleMaterialChange = (event) => {
    setMaterial(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleCategoriesChange = (event) => {
    const selectedCategories = Array.from(event.target.selectedOptions, (option) => Number(option.value));
    setCategories(selectedCategories);
  };

  const handleInStockOnlyChange = (event) => {
    setInStockOnly(event.target.checked);
  };
  
  

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFilterClick = () => {
    setShowOptions(!showOptions);
  };

  const handleSearchClick = () => {
    let filteredProducts = produits.filter((produit) =>
      produit.name.toLowerCase().includes(searchText.toLowerCase())
    );

    //applique les filtres
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
    
    //ajoute description
    if (searchTextDescription !== '') {
      filteredProducts = filteredProducts.filter((produit) =>
      produit.description.toLowerCase().includes(searchTextDescription.toLowerCase())
    );
    }

    setFilteredProducts(filteredProducts.slice(0, 10));
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

  return (
    <div className='m-5'>
      <div className='row'>
        <div className='col'>
          <div className='input-group'>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <button className='btn-brown' onClick={handleFilterClick}>Filtrer</button>
          </div>
        </div>
      </div>
      {showOptions && (
        <div className='position-absolute start-50 w-50 filtre bg-light'>
          <div className='ms-auto w-50 my-2'>
            <button className='my-2' onclick={handleResetClick}>Réinitialiser</button>
            <br />
            <label className='my-2'>Description</label>
            <input type="text" value={searchTextDescription} onchange={handleDescriptionTextChange} />

            <label className='my-2'>Matériau</label>
            <input type="text" value={material} onchange={handleMaterialChange} />

            <label className='my-2'>Prix min.</label>
            <input type="number" value={minPrice} onchange={handleMinPriceChange} />

            <label className='my-2'>Prix max.</label>
            <input type="number" value={maxPrice} onchange={handleMaxPriceChange} />

            <label className='my-2'>Catégories</label>
            <select value={categories} onchange={handleCategoriesChange}>
              <option value={0}>Table</option>
              <option value={1}>Étagères</option>
              <option value={2}>ya pas de 2</option>
              <option value={3}>Chaise</option>
              <option value={4}>Armoire</option>
              <option value={5}>Buffet</option>
            </select>
            
            

            <input className='my-2' type="checkbox" label="Afficher uniquement les produits en stock" checked={inStockOnly} onchange={handleInStockOnlyChange} />

            <label className='my-2'>Trier par</label>
            <select value={sortBy} onchange={handleSortByChange}>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="date-asc">Le plus récent</option>
              <option value="date-desc">Le plus ancien</option>
            </select>
          </div>
        </div>
      )}
      <div className='my-3 text-center'>
        <div className='col'>
          <button className='btn-brown' onClick={handleSearchClick}>Rechercher</button>
        </div>
      </div>
      <div className='mt-5'>
        {filteredProducts.slice(0, 10).map((produit) => (
          <div className='col-md-4' key={produit.id}>
            <div className="card mb-4 shadow-sm">
              <img src={produit.image} alt="Product" />
              <div className="card-body">
                <h5 className="card-title">{produit.name}</h5>
                <p className="card-text">{produit.description}</p>
                <p className="card-text">Matériau: {produit.material}</p>
                <p className="card-text">Prix: {produit.price}</p>
                <p className="card-text"><small className="text-muted">{produit.inStock ? 'En stock' : 'En rupture de stock'}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Recherche;
