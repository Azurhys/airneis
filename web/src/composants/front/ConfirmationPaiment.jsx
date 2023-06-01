import React, { useEffect, useContext } from "react";
import { cartContext } from "../../context/CartContext";
import axios from 'axios';

const ConfirmationPaiment = () => {
    const { cart, updateQuantity, removeFromCart, startCheckout, checkoutInProgress, clearCart } = useContext(cartContext);
    const orderNumberFromStorage = localStorage.getItem('orderNumber');

    // useEffect(() => {
    //     const submitOrder = async () => {
    //         // Récupérer le panier, l'adresse de livraison et les détails de paiement
    //         // const cartItems = JSON.parse(localStorage.getItem('cart'));
    //         // const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
    //         // const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));
    //         // const userId = localStorage.getItem('userID');
            
    //         // const today = new Date();
    //         // const formattedDate = today.toLocaleDateString('fr-FR');


    //         // // Créer l'objet de la commande
    //         // const order = {
    //         //     orderId: orderNumberFromStorage,
    //         //     userId: userId,
    //         //     cartItems: cartItems,
    //         //     deliveryAddress: deliveryAddress,
    //         //     paymentMethod: paymentDetails,
    //         //     orderDate: formattedDate
    //         // };

    //         // // Stocker la commande dans la base de données
    //         // try {
    //         //     // Envoyer les données à l'API avec axios
    //         //     const response = await axios.post(`${import.meta.env.VITE_API}commandes.json`, order);

    //         //     // Si tout se passe bien, affiche un message dans la console
    //         //     if (response.status === 200) {
    //         //         console.log("Commande enregistrée");

    //         //         // Effacer le panier, l'adresse de livraison et les détails de paiement du localStorage
    //         //         localStorage.removeItem('cart');
    //         //         localStorage.removeItem('deliveryAddress');
    //         //         localStorage.removeItem('paymentDetails');
    //         //         clearCart();
    //         //     }
    //         // } catch (error) {
    //         //     console.error(error);
    //         // }
    //     };

    //     submitOrder();
    // }, []);

    return <div className="d-flex flex-column gap-3 mb-3 w-75 ">
        <div className="mb-5">
         <h1 className="text-center">Commande effectuée</h1>
        </div>

        <div className="d-flex gap-3 text-center">
            <div className="d-flex w-25">
                <b>Votre commande à bien été enregistrée sous le numéro {orderNumberFromStorage}.<br></br>Vous pouvez suivre son état depuis votre espace client.</b>
            </div>
        </div>
    </div>;
}
 
export default ConfirmationPaiment;
