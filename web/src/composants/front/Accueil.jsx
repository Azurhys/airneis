import React, { useContext } from 'react';
import Carousel from 'better-react-carousel'
import { NavLink} from "react-router-dom"
import { useProduit } from "../../hook/useProduit";


const Accueil = () => {
  const [produits] = useProduit();

  // Filtrer les produits en avant
  const produitsEnAvant = produits.filter((produit) => produit.enAvant === 1);

  const getCategoryRoute = (categoryId) => {
    const url = '/Categorie'
    switch (categoryId) {
      case 0:
        return url + "/Table";
      case 1:
        return url + "/Meuble";
      case 2:
        return url + "/Lit";
      default:
        return "/";
    }
  };


  return (
    <>
      <br />
      <div className="text-center">
        <Carousel cols={1} rows={1} gap={10} loop autoplay={5000}>
          <Carousel.Item>
            <img
              width={500}
              src="https://picsum.photos/800/600?random=1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              width={500}
              src="https://picsum.photos/800/600?random=2"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              width={500}
              src="https://picsum.photos/800/600?random=3"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="text-center mt-3 mb-5 container-fluid">
        <h3>
          Venant des hautes terres d'écosse <br/> nos meubles sont immortels
        </h3>
        <div className="row">
        {produitsEnAvant.map((produit) => (
        <div key={produit.id} className="col-md-4 mb-5">
          <NavLink to={getCategoryRoute(produit.category_id)}>
            <img width={300} src={produit.image[0]} alt={produit.nom} />
          </NavLink>
        </div>
      ))}

        </div>
      </div>
    </>
  );
};

export default Accueil;
