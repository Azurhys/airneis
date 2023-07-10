import React from "react";

const ConfirmationPaiment = () => {

    const orderNumberFromStorage = localStorage.getItem('orderNumber');

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
