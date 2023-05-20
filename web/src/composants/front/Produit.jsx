import Caroussel from "../back/Caroussel";
import { useEffect } from "react";
import { useProduit } from "../../hook/useProduit";

const Produit = () => {
    const [produits] = useProduit();
    useEffect(() => {
        // Vous pouvez effectuer ici d'autres opérations liées aux produits si nécessaire
    }, [produits]);
    
    if (produits.length === 0) {
        // Gérez le cas où les produits sont en cours de chargement ou s'ils n'existent pas encore
        return <p>Chargement en cours...</p>;
    }
    
    const produit = produits[2]; // Supposons que vous souhaitez afficher les détails du premier produit

    const images = [
        'https://storage.googleapis.com/airneis-bfec3.appspot.com/OK.jpeg',
        'https://storage.googleapis.com/airneis-bfec3.appspot.com/OK.jpeg',
        'https://storage.googleapis.com/airneis-bfec3.appspot.com/OK.jpeg'
      ];

    return (
    <div className="mt-0 mb-5 container-fluid ml-0 mr-0 p-0">
        <div className="text-center p-0">
            <img src='https://picsum.photos/1200/300?random=1' className="w-100" alt="image produit" />
        </div>
        <div className="mt-5 container-fluid  w-100 px-5">
            <div className="row">
                <div className="text-center mx-0 col-6">
                    <Caroussel images={images} />
                </div>
                <div className="col-6">
                <div className="d-flex justify-content-between">
                    <h3>{produit.price}</h3>
                    <h3>{produit.name}</h3>
                    {/* <img src={produit.image} alt="Image du produit" /> */}
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