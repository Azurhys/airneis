import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink , useNavigate } from "react-router-dom"
import '../front/produits_details.css';

export const RecommandationsProduits = ({ produits, produit }) => {
    const produitsSimilaires = produits.filter(
        (p) => p.category_id === produit.category_id && p.product_id !== produit.product_id
      );
    const url = `/produit/`
    const produitsSimilairesAleatoires = produitsSimilaires.sort(() => Math.random() - 0.5);
    const sixProduitsSimilaires = produitsSimilairesAleatoires.slice(0, 6);
  
    return (


      <div class="row mt-3">
      
      {sixProduitsSimilaires.map((p) => (
        <div class="card" key={p.product_id} style={{ width: "300px", marginLeft: "10px" }}>
          <img img src={p.image[0]} alt={p.name} class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">Produit 1</h5>
            <p class="card-text">Prix du Produit 1</p>
            <NavLink to={url+`${p.product_id}`} class="btn btn-primary">
              Voir plus
            </NavLink>
            <a href="lien_vers_produit1.html" ></a>
          </div>
        </div>
        ))}
      </div>
      

    
    );
  };