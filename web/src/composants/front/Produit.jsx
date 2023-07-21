import React from 'react';
import Caroussel from "../back/Caroussel";
import { useProduit } from "../../hook/useProduit";
import { RecommandationsProduits } from "../back/RecommandationsProduits";
import { useParams } from 'react-router-dom';
import { cartContext } from "../../context/CartContext";
import { useContext } from "react";
import './produits_details.css';

const Produit = () => {
  const [produits] = useProduit();
  const { id } = useParams();
  const { addToCart } = useContext(cartContext);
  const produitId = Number(id);
  let PanierAchat = "";

  if (produits && produits.length > 0) {
    if (produits[produitId].quantity > 0) {
      PanierAchat = "btn btn-brown";
    } else {
      PanierAchat = "btn-brown-reverse";
    }
  }

  let produit;
  if (produits && produits.length > 0) {
    produit = produits.find((p) => p.product_id === produitId);
  }

  return (
    
  <div className="container">
     <div className="text-center p-0" style={{marginTop:"20px"}}>
        {produits && produits[produitId] && (
          <img
            src={produits[produitId].image[1]}
            className="img-banner w-100"
            alt="image produit"
          />
        )}</div>
    <div className="row">
      <div className="col-md-7">
      <div className="mt-5 container-fluid  w-100 px-5 ">
        <div className="row">
          <div className="text-center mx-0 col-6 caroussel-h" style={{ width: "500px", height: "500px" }} >
            {produits && produits[produitId] && (
              <Caroussel images={produits[produitId].image} style={400} />
            )}
          
        </div>
      </div>
      </div>
      </div>
      <div className="col-md-5" style={{marginTop: "25px"}}>
        <div className="project-info-box">
            <p><div style={{marginLeft: "300px"}}>
                {produits && produits[produitId] && (
                    new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                }).format(produits[produitId].price)
                )}</div>
                {produits && produits[produitId] && (
                <h3 style={{ marginTop: "-20px" }}>{produits[produitId].name}</h3>
                )}
                
            <p> {produits && produits[produitId] && (
                    <h5 classNameName="text-secondary" style={{ marginLeft: "300px" }}>
                    {produits[produitId].quantity > 0
                    ? "En Stock"
                    : "Stock Épuisé"}
                    </h5>
                )}</p></p>
          
          
          <div className="project-info-box mt-0" style={{ paddingLeft: "0px" }}>
            <h5>DETAILS PRODUIT</h5>
            <p className="mb-0">{produits && produits[produitId] && (
                                <p className="my-4">{produits[produitId].description}</p>
                            )}</p>
          </div>
        </div>
        <div className="project-info-box mt-0 mb-0">
          <p className="mb-0">
          {produits && produits[produitId] && (
                <button style={{ marginLeft: "75px", width: "320px", height: "42px" }}
                  className={PanierAchat}
                  onClick={() => addToCart(produits[produitId])}
                >
                  {produits[produitId].quantity > 0
                    ? "Ajouter au panier"
                    : "Stock Épuisé"}
                </button>
              )}
          </p>
        </div>
      </div>
    </div>

    <div className="row mt-5">
      <div className="col-md-12">
        <h2 style={{textAlign: "center"}}>Produits similaires</h2>
      </div>
    </div>

    <div >
          {produits && produits[produitId] && (
            <RecommandationsProduits
                
              produits={produits}
              produit={produits[produitId]}
            />
          )}
    </div>
  

  <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.bundle.min.js"></script>
  <script type="text/javascript"></script>
  </div>

  );
};

export default Produit;
