import PanierProduit from "./PanierProduit";
import { cartContext} from "../../context/CartContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Panier = () => {
    const { cart, updateQuantity, removeFromCart } = useContext(cartContext);
    const total = cart.reduce((total, product) => total + product.price * product.quantityInCart, 0);
    const tva = total * 0.2;
    const handleCheckout = async () => {
        // Get user_id
        // In this case, I will use a dummy user_id
        const user_id = "user123";
    
        // Prepare the data to be sent
        const panierData = {
            user_id: user_id,
            cart: cart,
            total: total,
            tva: tva,
            timestamp: Date.now()   // Set the current timestamp
        };
        const updatedProducts = cart.map(product => {
            return {
                ...product,
                quantity: product.quantity - product.quantityInCart,
                quantityInCart: 0, // reset quantityInCart
            };
        });
        try {
            await axios.post(`${import.meta.env.VITE_API}paniers.json`, panierData)
            .then((response) => {
                console.log("Order successfully stored");
                // Clear the cart after successfully storing the order
                
            })
            .catch((error) => {
                console.error("Error adding order: ", error);
            });
        
        await Promise.all(updatedProducts.map(product =>
            axios.put(`${import.meta.env.VITE_API}produits/${product.product_id}.json`, product)
        ));

        // If all product updates succeed, update the cart state and clear the local storage
        setCart(updatedProducts); // update cart with new quantities
        localStorage.setItem('cart', JSON.stringify(updatedProducts))
        setCart([]);
        localStorage.removeItem('cart');
        
        }catch (error) {
            console.error("Error processing checkout: ", error);
        }
    };

    return <div className="d-flex flex-column gap-3 mb-3 w-90 mx-5">
        <div className="mb-5 ">
        <br/>
         <h1 className="text-center">Panier</h1>
        </div>
        <div className="w-50">
        <div>
        
            {cart.map((product, index) => (
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
                    <button className="btn btn-danger" onClick={() => removeFromCart(product.id)}>Supprimer</button>
                </div>
            
            
                </div>
            ))}
        </div>
        <div className="d-flex">
                <div className="w-50">
                    <h2 className="d-flex justify-content-between">
                        Total
                        <span>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(total)}</span>
                    </h2>
                    <h2 class="text-muted fs-6 d-flex justify-content-between">TVA
                    <span>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(tva)}</span>
                    </h2>
                    <NavLink onClick={handleCheckout} to="/paiement" className="nav-link btn btn-brown">
                            Procéder au paiement
                    </NavLink>
                </div>
        </div>      
        </div>


    </div>;
}
 
export default Panier;
