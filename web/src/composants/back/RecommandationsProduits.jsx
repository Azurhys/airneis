import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink , useNavigate } from "react-router-dom"

export const RecommandationsProduits = ({ produits, produit }) => {
    const produitsSimilaires = produits.filter(
        (p) => p.category_id === produit.category_id && p.product_id !== produit.product_id
      );
        console.log(produits);
    const url = `/produit/`
    const produitsSimilairesAleatoires = produitsSimilaires.sort(() => Math.random() - 0.5);
    const sixProduitsSimilaires = produitsSimilairesAleatoires.slice(0, 6);
  
    return (
      <div>
        <div className="row d-flex my-5">
            {sixProduitsSimilaires.map((p) => (
                <div key={p.product_id} className='col-4'>
                    <NavLink to={url+`${p.product_id}`}>
                        <img src={p.image[0]} className='w-100' alt={p.name} />
                    </NavLink>
                </div>
            ))}
        </div>
      </div>
    );
  };