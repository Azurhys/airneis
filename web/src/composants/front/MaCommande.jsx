import { useParams } from 'react-router-dom';
import { useCommandes } from '../../hook/useCommandes';
import axios from 'axios';
import { useState } from 'react';

const MaCommande = () => {
    const { orderId } = useParams(); 
    const [commandes] = useCommandes();
    const commande = commandes.find(commande => commande.orderId === orderId);
    
    // Créez un nouvel état pour la quantité temporaire
    const [tempQuantities, setTempQuantities] = useState({});

    // Lorsque la quantité dans le champ d'entrée est modifiée, mettez à jour l'état temporaire
    const handleQuantityChange = (productId, newQuantity) => {
        setTempQuantities({ ...tempQuantities, [productId]: newQuantity });
    };

    // Lorsque l'utilisateur clique sur 'Retourner le produit', utilisez la valeur de l'état temporaire pour mettre à jour la quantité dans le panier
    const handleReturnProduct = (productId) => {
        updateQuantityInOrder(productId, tempQuantities[productId]);
    };

    if (!commande) {
        return null;
    }
  
    const { orderDate, orderStatus, deliveryAddress, billingAddress, paymentMethod, cartItems } = commande;
    let total = commande.cartItems.total;
    
    const handleCancelOrder = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API}commandes/${orderId}.json`, { ...commande, status: 'ANNULÉE' });
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReturn = async (productId, quantity) => {
        const confirmReturn = window.confirm('Êtes-vous sûr de vouloir retourner ce produit ?');

        if (!confirmReturn) {
          return;
        }

        let newCommande = { ...commande };
        newCommande.cartItems.cart.forEach((item) => {
          if (item.id === productId) {
            item.quantityInCart -= quantity;
          }
        });

        await axios.put(`${import.meta.env.VITE_API}commandes/${orderId}.json`, newCommande);

        const productResponse = await axios.get(`${import.meta.env.VITE_API}produits/${productId}.json`);
        let productData = productResponse.data;
        productData.stock += quantity;
        await axios.put(`${import.meta.env.VITE_API}produits/${productId}.json`, productData);
        
        window.location.reload();
    };
    
    const updateQuantityInOrder = async (productId, newQuantity) => {
        // Trouver l'élément dans la commande
        let itemInOrder;
        const newCartItems = commande.cartItems.cart.map((item) => {
            if (item.product_id === productId) {
                itemInOrder = item;
                return { ...item, quantityInCart: newQuantity };
            } else {
                return item;
            }
        });
    
        // Si l'élément n'est pas trouvé, arrêter l'exécution de la fonction
        if (!itemInOrder) {
            console.error(`Le produit avec l'id ${productId} n'a pas été trouvé dans la commande.`);
            return;
        }
    
        // Calculer la différence entre la nouvelle et l'ancienne quantité
        const quantityDifference = itemInOrder.quantityInCart - newQuantity;
    
        // Mettre à jour la commande dans la base de données
        const newCommande = { ...commande, cartItems: { ...commande.cartItems, cart: newCartItems } };
        try {
            await axios.put(`${import.meta.env.VITE_API}commandes/${orderId}.json`, newCommande);
    
            // Ensuite, obtenir tous les produits et trouver celui qui a l'ID correspondant
            const productsResponse = await axios.get(`${import.meta.env.VITE_API}produits.json`);
            const products = productsResponse.data;
            
            for (const key in products) {
                if (products[key].product_id === productId) {
                    const updatedProduct = { ...products[key], quantity: products[key].quantity + quantityDifference };
                    await axios.put(`${import.meta.env.VITE_API}produits/${key}.json`, updatedProduct);
                    break;
                }
            }
    
            // Recharger la page pour refléter les nouvelles données
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <>
        <div className="text-center my-5">
            <h1>Commande #{orderId} - {orderDate} - {commande.status}</h1>
            {commande.status === 'EN COURS' && (
            <button className='btn btn-danger' onClick={handleCancelOrder}>Annuler la commande</button>
        )}
        </div>
        <div className="d-flex gap-3 mx-5">
            <div className="w-50">
            {cartItems.cart.map((product, index) => (
                <div className="d-flex gap-3 mb-5">
                <div className="image w-25">
                    <img src={product.image} class="img-fluid" />
                </div>
                <div className="w-50">
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                </div>
                <div className="w-25">
                    <p>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(product.price)}</p>
                    {commande.status === 'EN COURS' && (
                    <input type="number" class="w-90 gap-3 mb-3" min="0" max={product.quantityInCart}
                    value={tempQuantities[product.product_id] || product.quantityInCart} 
                    onChange={e => handleQuantityChange(product.product_id, e.target.value)} />
                        )}
                    {commande.status ==='ANNULÉE' || commande.status === 'LIVRÉE' || commande.status === 'EXPÉDIÉE' && (
                        <h4>{product.quantityInCart} exemplaires</h4>
                    )}
                    <i class="bi bi-trash d-flex flex-column "></i>
                    {commande.status === 'EN COURS' && (
                    <button className="btn btn-danger" onClick={() => handleReturnProduct(product.product_id)}>Faire un retour du produit</button>
                    )}
                </div>
                </div>
            ))}
            </div>

            <div className="w-50">
                <h2 className="d-flex justify-content-between">
                    Total
                    <span>{total}€</span>
                </h2>
                <h2 class="text-muted fs-6 d-flex justify-content-between">TVA
                <span>{total * 0.2}€</span>  {/* Calculer la TVA ici */}
                </h2>
                <h2 className="my-3">Adresse de livraison</h2>
                {deliveryAddress.prenom} {deliveryAddress.nom} <br />
                {deliveryAddress.adresse1} <br />
                {deliveryAddress.adresse2} <br />
                {deliveryAddress.codePostal} {deliveryAddress.ville} <br />
                {deliveryAddress.pays} <br />
                {deliveryAddress.telephone} 
                <h2 className="my-3">Adresse de facturation</h2>
                {/* Ajouter l'adresse de facturation ici */}
                {billingAddress.prenom} {deliveryAddress.nom} <br />
                {billingAddress.adresse1} <br />
                {billingAddress.adresse2} <br />
                {billingAddress.codePostal} {deliveryAddress.ville} <br />
                {billingAddress.pays} <br />
                {billingAddress.telephone} 
                <h2 className="my-3">Méthode de paiement</h2>
                Carte de crédit<br />
                {'**** **** **** ' + paymentMethod.cardNumber.slice(-4)}
            </div>
        </div>
        </>
    );
}
 
export default MaCommande;
