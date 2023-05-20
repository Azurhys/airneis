import Caroussel from "../back/Caroussel";
import { useProduit } from "../../hook/useProduit";



const Produit = () => {
    const [produits] = useProduit();
    const images = [
        'https://picsum.photos/1200/300?random=1',
        'https://picsum.photos/1200/300?random=2',
        'https://picsum.photos/1200/300?random=3'
      ];

    return (
    <div className="mt-0 mb-5 container-fluid ml-0 mr-0 p-0">
        <div className="text-center p-0">
        {
             produits && produits[0] && // vérif de delai pour pas que l'URL soit vide 
            <img src={produits[0].image[1]} className="img-banner w-100" alt="image produit" />
        }
        </div>
        <div className="mt-5 container-fluid  w-100 px-5">
            <div className="row">
                <div className="text-center mx-0 col-6 ">
                    {
                        produits && produits[0] && // vérif de delai pour pas que l'URL soit vide 
                    <Caroussel images={produits[0].image} />
                    }
                </div>
                <div className="col-6">
                <div className="d-flex justify-content-between">
                    <h3>1200 ${/** Prix du Produit*/}</h3>
                    <h3>NOM DU PRODUIT {/** Nom du Produit*/}</h3>
                </div>
                <div className="d-flex justify-content-end">
                    <h5 className="text-secondary">En Stock {/** Booléen Produit en Stock*/}</h5>
                </div>
                <div>
                    <p className="my-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
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