import { useParams } from 'react-router-dom';
import PanierProduit from "./PanierProduit";
import { useCommandes } from '../../hook/useCommandes';
import axios from 'axios';

const MaCommande = () => {
    const { orderId } = useParams(); 
    const [commandes] = useCommandes();
    const commande = commandes.find(commande => commande.orderId === orderId);
  
    if (!commande) {
        return null;
    }
  
    const { orderDate, orderStatus, deliveryAddress, paymentMethod, cartItems } = commande;
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
    
        // Calculer la différence entre la nouvelle et l'ancienne quantité
        const quantityDifference = itemInOrder.quantityInCart - newQuantity;
    
        // Mettre à jour la commande dans la base de données
        const newCommande = { ...commande, cartItems: { ...commande.cartItems, cart: newCartItems } };
        try {
            await axios.put(`${import.meta.env.VITE_API}commandes/${orderId}.json`, newCommande);
    
            // Ensuite, mettre à jour le stock du produit dans produits.json
            const productResponse = await axios.get(`${import.meta.env.VITE_API}produits/${productId}.json`);
            const product = productResponse.data;
            const updatedProduct = { ...product, stock: product.stock + quantityDifference };
            await axios.put(`${import.meta.env.VITE_API}produits/${productId}.json`, updatedProduct);
    
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
                    <input type="number" class="w-90 gap-3 mb-3" min="1" 
                        value={product.quantityInCart} 
                        onChange={e => updateQuantityInOrder(product.id, Number(e.target.value))} />
                        )}
                    {commande.status ==='ANNULÉE' || commande.status === 'LIVRÉE' || commande.status === 'EXPÉDIÉE' (
                        <h4>{product.quantityInCart} exemplaires</h4>
                    )}
                    <i class="bi bi-trash d-flex flex-column "></i>
                    {commande.status === 'EN COURS' && (
                    <button className="btn btn-danger" onClick={() => handleReturn(product.id, product.quantityInCart)}>
                        Retourner le produit
                    </button>
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
                <h2 className="my-3">Adresse de facturation</h2>
                {/* Ajouter l'adresse de facturation ici */}
                {deliveryAddress.prenom} {deliveryAddress.nom} <br />
                {deliveryAddress.adresse1} <br />
                {deliveryAddress.adresse2} <br />
                {deliveryAddress.codePostal} {deliveryAddress.ville} <br />
                <h2 className="my-3">Méthode de paiement</h2>
                Carte de crédit<br />
                {'**** **** **** ' + paymentMethod.cardNumber.slice(-4)}
            </div>
        </div>
        </>
    );
}
 
export default MaCommande;
