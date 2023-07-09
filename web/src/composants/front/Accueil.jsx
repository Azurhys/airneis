import React, { useContext } from 'react';
import Carousel from 'better-react-carousel'
import { NavLink} from "react-router-dom"
import { useProduit } from "../../hook/useProduit";
import { useCategories } from '../../hook/useCategorie'

const Accueil = () => {
  const [produits] = useProduit();
  const [categories] = useCategories();

  // Filtrer les produits en avant
  const produitsEnAvant = produits.filter((produit) => produit.enAvant === 1);

  const getCategoryRoute = (categoryId) => {
    return `/Categorie/${categoryId}`;
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
      <div className="text-center mt-5 mb-5 container-fluid">
      <div className="row">
        {categories.map((categorie) => (
          <div key={categorie.category_id} className="col-md-4 mb-5">
            <NavLink to={getCategoryRoute(categorie.category_id)}>
              <img width={300} src={categorie.image} alt={categorie.name} />
              <p>{categorie.name}</p>
            </NavLink>
          </div>
        ))}
        </div>
        <h3>
          Venant des hautes terres d'Écosse <br/> nos meubles sont immortels
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
