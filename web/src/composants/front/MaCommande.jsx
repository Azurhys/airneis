import { useParams } from 'react-router-dom';
import { useCommandes } from '../../hook/useCommandes';
import axios from 'axios';
import { useState } from 'react';

const MaCommande = () => {
    const { orderId } = useParams(); 
    const [commandes, handleCancelOrder, updateQuantityInOrder, handleReturn] = useCommandes();
    const commande = commandes.find(commande => commande.orderId === orderId);
    const [tempQuantities, setTempQuantities] = useState({});

    const handleQuantityChange = (productId, newQuantity) => {
        setTempQuantities({ ...tempQuantities, [productId]: newQuantity });
    };

    const handleupdateQuantity = (productId) => {
        updateQuantityInOrder(productId, tempQuantities[productId], commande, orderId);
    };

    const handleReturnProduct = (productId) => {
        handleReturn(productId, tempQuantities[productId], commande, orderId);
    }

    if (!commande) {
        return null;
    }
  
    const { orderDate, orderStatus, deliveryAddress, billingAddress, paymentMethod, cartItems } = commande;
    let total = commande.cartItems.total;
    
    return (
        <>
        <div className="text-center my-5">
            <h1>Commande #{orderId} - {orderDate} - {commande.status}</h1>
            {commande.status === 'EN COURS' && ( <button className='btn btn-danger' onClick={() => handleCancelOrder(orderId, commande)}>Annuler la commande</button>)}
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
                        <button className="btn btn-danger" onClick={() => handleupdateQuantity(product.product_id)}>Changer la quantité</button>
                    )}
                    {commande.status === 'LIVRÉE' && (
                        <button className="btn btn-danger" onClick={() => handleReturnProduct(product.product_id)}>Faire un retour produit</button>
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
