import Caroussel from "../back/Caroussel";
import { useProduit } from "../../hook/useProduit";
import { RecommandationsProduits } from "../back/RecommandationsProduits";
import { useParams } from 'react-router-dom';

const Produit = () => {
    const [produits] = useProduit();
    const { id } = useParams();

    let produit;
    if (produits && produits.length > 0) {
        produit = produits.find((p) => p.produit_id === id);
    }
        const number = 0;
      if (produits && produits.length > 0) {
        const produitId = produits[0].produit_id;
        const produit = produits.find((p) => p.produit_id === produitId);
        }
    return (
    <div className="mt-0 mb-5 container-fluid ml-0 mr-0 p-0">
        <div className="text-center p-0">
        {
             produits && produits[0] && // vérif de delai pour pas que l'URL soit vide 
            <img src={produits[number].image[1]} className="img-banner w-100" alt="image produit" />
        }
        </div>
        <div className="mt-5 container-fluid  w-100 px-5 ">
            <div className="row">
                <div className="text-center mx-0 col-6 caroussel-h">
                    {
                        produits && produits[number] && // vérif de delai pour pas que l'URL soit vide 
                    <Caroussel images={produits[number].image} style={400} />
                    }
                </div>
                <div className="col-6">
                <div className="d-flex justify-content-between">
                    <h3>{ 
                    produits && produits[number] &&
                    new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(produits[0].price)
                    }
                    </h3>
                    {
                        produits && produits[number] && <h3>{produits[number].name} {/** Nom du Produit*/}</h3>
                    }
                </div>
                <div className="d-flex justify-content-end">
                    {produits && produits[number] &&
                    <h5 className="text-secondary">
                        
                            
                        {produits[number].quantity > 0 ? 'En Stock' : 'Stock Épuisé'}</h5>
                    }
                </div>
                <div>
                    { produits && produits[number] &&
                    <p className="my-4">
                    {produits[number].description}
                    </p>
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
                    produits && produits[number] &&
            <RecommandationsProduits produits={produits} produit={produits[number]} />
            }
            </div>
        </div>
        </div>
    </div> );
}
 
export default Produit;