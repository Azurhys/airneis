import Caroussel from "../back/Caroussel";
import { useProduit } from "../../hook/useProduit";



const Produit = () => {
    const [produits] = useProduit();
    const images = [
        'https://picsum.photos/1200/300?random=1',
        'https://picsum.photos/1200/300?random=2',
        'https://picsum.photos/1200/300?random=3'
      ];
      const number = 1;
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
            <div className="row d-flex my-5">
                {images.map((image, index) => (
                <div className="col-4">
                    <img key={index} src={image} className='w-100' alt='Caroussel Slide'/>
                </div>
                ))}
            </div>
        </div>
        </div>
    </div> );
}
 
export default Produit;