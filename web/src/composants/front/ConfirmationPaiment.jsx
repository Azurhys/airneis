import React, { useState } from "react";

const ConfirmationPaiment = () => {

                // Récupérer le panier, l'adresse de livraison et les détails de paiement
            const cartItems = JSON.parse(localStorage.getItem('cart'));
            const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
            const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));

            // Créer l'objet de la commande
            const order = {
                orderId: orderNumber,  // Vous pouvez utiliser votre fonction pour générer un numéro de commande
                userId: localStorage.getItem('userId'),
                cartItems: cartItems,
                deliveryAddress: deliveryAddress,
                paymentMethod: paymentDetails
            };

            // Stocker la commande dans la base de données
            try {
                // Envoyer les données à l'API avec axios
                const response = await axios.post(`${import.meta.env.VITE_API}commandes.json`, order);

                // Si tout se passe bien, affiche un message dans la console
                if (response.status === 200) {
                    console.log("Commande enregistrée");

                    // Effacer le panier, l'adresse de livraison et les détails de paiement du localStorage
                    localStorage.removeItem('cart');
                    localStorage.removeItem('deliveryAddress');
                    localStorage.removeItem('paymentDetails');
                }
            } catch (error) {
                console.error(error);
            }


    return <div className="d-flex flex-column gap-3 mb-3 w-75 ">
        <div className="mb-5">
         <h1 className="text-center">Commande effectuée</h1>
        </div>

        <div className="d-flex gap-3">


            <div className="">
            <b>Votre commande à bien été enregistrée sous le numéro de XXXXXX.<br></br>Vous pouvez suivre son état depuis votre espace client.</b>
            </div>

            
        </div>
        
        


    </div>;
}
 
export default ConfirmationPaiment;
