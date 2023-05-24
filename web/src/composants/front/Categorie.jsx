import { useState, useEffect } from "react";
import React from 'react'
import { useCategories } from "../../hook/useCategorie";
import { useProduit } from "../../hook/useProduit";
import { useParams, NavLink } from 'react-router-dom';

const Categorie = () => {
    const [categories] = useCategories();
    const [produits, setProduits] = useProduit();
const number = 0;
const { category_id } = useParams(); // on obtient l'ID de la catégorie à partir de l'URL
const produitsParCategorie = produits.filter(p => p.category_id === Number(category_id));
const sortedProduits = [...produitsParCategorie].sort((a, b) => {
    if (a.quantity === 0) return 1; // si le produit A est épuisé, il doit aller à la fin
    if (b.quantity === 0) return -1; // si le produit B est épuisé, il doit aller au début
    // Sinon, trier par priorité
    return b.priority - a.priority; // ordre décroissant de priorité
});



return (
<>
<div className="text-center p-0">
        {
             categories && categories[0] && // vérif de delai pour pas que l'URL soit vide 
            <img src={categories[category_id].image} className="img-banner w-100" alt="image categorie" />
        }
        </div>
<div className="text-center my-5">
        {
             categories && categories[0] && // vérif de delai pour pas que l'URL soit vide 
            <h3>{categories[category_id].description}</h3>
        }
</div>
<div className="text-center mt-5 mb-5 container-fluid">
    <div className="row justify-content-center">
    {sortedProduits.map((p) => (
                <div className="col-4 mb-5 align-items-center" key={p.product_id}>
                    <NavLink to={`/produit/${p.product_id}`}>
                    { produits && produits[0] &&
                        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={p.image[0]} alt={p.name} />}
                    </NavLink>
                    <div className="mt-3 d-flex justify-content-between">
                        { produits && produits[0] &&
                        <h4>{p.name}</h4>}
                        <h4>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(p.price)}</h4>
                    </div>
                    <div className="mt-3 d-flex justify-content-end">
                    {produits && produits[0] &&
                    <h5 className="text-secondary">
                        {p.quantity > 0 ? 'En Stock' : 'Stock Épuisé'}</h5>
                    }
                    </div>
                </div>
            ))}
       </div>     
</div>
</>
)
}

export default Categorie;