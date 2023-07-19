import React, { useContext } from 'react';
import Carousel from 'better-react-carousel'
import { NavLink} from "react-router-dom"
import { useProduit } from "../../hook/useProduit";
import { useCategories } from '../../hook/useCategorie'
import { useCarouselImages } from '../../hook/useCarousel';

const Accueil = () => {
  const [produits] = useProduit();
  const [categories] = useCategories();
  const [images] = useCarouselImages();
  // Filtrer les produits en avant
  const produitsEnAvant = produits.filter((produit) => produit.enAvant === 1);

  const getCategoryRoute = (categoryId) => {
    return `/Categorie/${categoryId}`;
  };

  // Trier les catégories par priorité décroissante
  const categoriesSorted = [...categories].sort((a, b) => b.priority - a.priority);

  return (
    <>
      <br />
      <div className="text-center">
      <Carousel cols={1} rows={1} gap={10} loop autoplay={5000}>
      {images.map((src, index) => (
        <Carousel.Item key={index}>
          <img width={500} src={src} />
        </Carousel.Item>
      ))}
    </Carousel>
      </div>
      <div className="text-center mt-5 mb-5 container-fluid">
      <div className="row">
        {categoriesSorted.map((categorie) => (
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
