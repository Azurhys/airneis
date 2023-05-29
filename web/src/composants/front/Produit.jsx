import Caroussel from "../back/Caroussel";
import { useProduit } from "../../hook/useProduit";
import { RecommandationsProduits } from "../back/RecommandationsProduits";
import { useParams } from 'react-router-dom';

const Produit = () => {
    const [produits] = useProduit();
    const { id } = useParams();

    const produitId = Number(id);
    let PanierAchat = "";
       
    if (produits && produits.length > 0) {
        if (produits[produitId].quantity > 0){
            PanierAchat = "btn btn-brown"
        } else {
            PanierAchat = "btn btn-brown-reverse"
        }
    }
    
    let produit;
    if (produits && produits.length > 0) {
        produit = produits.find((p) => p.product_id === produitId);
    }

    
        const number = 0;
      if (produits && produits.length > 0) {
        const produitId = produits[0].product_id;
        const produit = produits.find((p) => p.product_id === produitId);
        
        }
    return (
    <div className="mt-0 mb-5 container-fluid ml-0 mr-0 p-0">
        <div className="text-center p-0">
        {
             produits && produits[0] && // vérif de delai pour pas que l'URL soit vide 
            <img src={produits[produitId].image[1]} className="img-banner w-100" alt="image produit" />
        }
        </div>
        <div className="mt-5 container-fluid  w-100 px-5 ">
            <div className="row">
                <div className="text-center mx-0 col-6 caroussel-h">
                    {
                        produits && produits[produitId] && // vérif de delai pour pas que l'URL soit vide 
                    <Caroussel images={produits[produitId].image} style={400} />
                    }
                </div>
                <div className="col-6">
                <div className="d-flex justify-content-between">
                    <h3>{ 
                    produits && produits[produitId] &&
                    new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(produits[0].price)
                    }
                    </h3>
                    {
                        produits && produits[produitId] && <h3>{produits[produitId].name} {/** Nom du Produit*/}</h3>
                    }
                </div>
                <div className="d-flex justify-content-end">
                    {produits && produits[produitId] &&
                    <h5 className="text-secondary">
                        
                            
                        {produits[produitId].quantity > 0 ? 'En Stock' : 'Stock Épuisé'}</h5>
                    }
                </div>
                <div>
                    { produits && produits[produitId] &&
                    <p className="my-4">
                    {produits[produitId].description}
                    </p>
                    }
                </div>
                <div>
                    { produits && produits[produitId] &&
                    <button className={PanierAchat}>
                        {produits[produitId].quantity > 0 ? "Ajouter au panier" : "Rupture de stock"}
                    </button>
                    }
                </div>
            </div>
        </div>
        <div className="container-fluid mt-5 p-0 ">
            <div className="row">
                <h2 className="text-center">Produits Similaires</h2>  
            </div>
            <div>
            { 
                    produits && produits[produitId] &&
            <RecommandationsProduits produits={produits} produit={produits[produitId]} />
            }
            </div>
        </div>
        </div>
    </div> );
}
 
export default Produit;