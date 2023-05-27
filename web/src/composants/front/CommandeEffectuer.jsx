import React, { useState } from "react";

const CommandeEffectuer = () => {


    return <div className="d-flex flex-column gap-3 mb-3 w-75 ">
        <div className="mb-5">
         <h1 className="text-center">Commande effectuée</h1>
        </div>

        <div><b>Merci de votre achat !</b></div>
        <div className="d-flex gap-3">

            <div className="">
            <b>Votre commande à bien été enregistrée sous le numéro de XXXXXX.<br/>Vous pouvez suivre son état depuis votre espace client.</b>
            </div>
    
            
        </div>
        
        


    </div>;
}
 
export default CommandeEffectuer;
