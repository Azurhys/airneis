import { useParams } from 'react-router-dom';
import PanierProduit from "./PanierProduit";
import { useCommandes } from '../../hook/useCommandes';

const MaCommande = () => {
    const { orderId } = useParams(); 
    const [commandes] = useCommandes();
    const commande = commandes.find(commande => commande.orderId === orderId);
  
    // Retourner null si la commande n'est pas trouvée.
    if (!commande) {
        return null;
    }
  
    const { orderDate, orderStatus, deliveryAddress, paymentMethod, cartItems } = commande;
    
    // Calculer le total de la commande et le nombre d'articles...
    let total = commande.cartItems.total;
    let itemCount = 0;
    
  
    return (
        <>
        <div className="text-center my-5">
            <h1>Commande #{orderId} - {orderDate} - {orderStatus}</h1>
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
                    <input type="number" class="w-90 gap-3 mb-3" min="1" 
                        value={product.quantityInCart} 
                        onChange={e => updateQuantity(product.id, e.target.value)} />
                    <i class="bi bi-trash d-flex flex-column "></i>
                    <button className="btn btn-danger" onClick={() => removeFromCart(product.id)}>Faire un retour du produit</button>
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
