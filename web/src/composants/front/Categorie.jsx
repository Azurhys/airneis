import React from 'react'
import { useCategories } from "../../hook/useCategorie";
import { useProduit } from "../../hook/useProduit";
import { useParams, NavLink } from 'react-router-dom';
import './catalogue.css';

const Categorie = () => {
    const [categories] = useCategories();
    const [produits] = useProduit();
    const { category_id } = useParams(); 
    const produitsParCategorie = produits.filter(p => p.category_id === Number(category_id));
    const sortedProduits = [...produitsParCategorie].sort((a, b) => {
        if (a.quantity === 0) return 1; // si le produit A est épuisé, il doit aller à la fin
        if (b.quantity === 0) return -1; // si le produit B est épuisé, il doit aller au début
        // Sinon, trier par priorité
        return b.priority - a.priority; // ordre décroissant de priorité
    });



return (
<>

<body>
  <div className="container bootstrap snipets">
    <h1 className="text-center text-muted">Catalogue</h1> <br /><br />

    <div className="text-center p-0">
        {
             categories && categories[0] && // vérif de delai pour pas que l'URL soit vide 
            <img src={categories[category_id].image} className="img-banner w-100" alt="image categorie" />
        }
        </div>

    <div className="text-center my-5">
        {
             categories && categories[0] && // vérif de delai pour pas que l'URL soit vide 
            <h3>{categories[category_id].description}</h3>
        }
    </div> <br /><br /><br />



    <div className="row flow-offset-1">


        {sortedProduits.map((p) => (
        <div className="col-xs-6 col-md-4" key={p.product_id}>
            <div className="product tumbnail thumbnail-3">
            <a href="#"><NavLink to={`/produit/${p.product_id}`}>
                    { produits && produits[0] &&
                        <img style={{ maxWidth: '80%', maxHeight: '80%' }} src={p.image[0]} alt={p.name} />}
                    </NavLink></a>
            <div className="caption">
                <h6>
                <a href="#">{ produits && produits[0] &&
                        <h4>{p.name}</h4>}</a>
                </h6>
                <span className="price">{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(p.price)}</span>
                <span className="stock">{produits && produits[0] &&
                    <h5 className="text-secondary">
                        {p.quantity > 0 ? 'En Stock' : 'Stock Épuisé'}</h5>
                    }</span>
            </div>
            </div> <br /><br /><br />
        
        </div> 
        ))}
    </div>
    
  </div>
  
</body>

</>
)
}

export default Categorie;