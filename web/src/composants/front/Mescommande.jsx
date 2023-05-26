import React, { useState } from "react";
import Commande from "./Commande";

const Mescommande = () => {


    return <div className="d-flex flex-column gap-3 mb-3 w-75 ">
    <div className="mb-5">
     <h1 className="text-center">Mes commandes</h1>
    </div>

     <h2 className="">2022</h2>

     <br/>

    <div className="d-flex gap-3">

        <div className="w-50">
            <Commande />
        </div>

        <div className="w-50">
            <h3 className="d-flex justify-content-between">
                EN COURS
            </h3>
            <h3 class="fs-6 d-flex justify-content-between">1200€
            </h3>
        </div>    
    </div>


    <div className="d-flex gap-3">


        <div className="w-50">
            <Commande />
        </div>
        <div className="w-50">
            <h2 className="d-flex justify-content-between">
                LIVREE
            </h2>
            <h2 class="fs-6 d-flex justify-content-between">1200€
            </h2>
        </div> 
    </div>
    
    <div className="d-flex gap-3">

    <div className="w-50">
        <Commande />
    </div>

    <div className="w-50">
        <h2 className="d-flex justify-content-between">
            ANNULER
        </h2>
        <h2 class="fs-6 d-flex justify-content-between">1200€
        </h2>
    </div>    
    </div>


    <div className="d-flex gap-3">

        <div className="w-50">
            <Commande />
        </div>

        <div className="w-50">
            <h2 className="d-flex justify-content-between">
                LIVREE
            </h2>
            <h2 class="fs-6 d-flex justify-content-between">1200€
            </h2>
        </div>    
    </div>

    <br/>
    <h2 className="">2021</h2>

     <br/>

    <div className="d-flex gap-3">

        <div className="w-50">
            <Commande />
        </div>

        <div className="w-50">
            <h3 className="d-flex justify-content-between">
                LIVREE
            </h3>
            <h3 class="fs-6 d-flex justify-content-between">1200€
            </h3>
        </div>    
    </div>


    <div className="d-flex gap-3">


        <div className="w-50">
            <Commande />
        </div>
        <div className="w-50">
            <h2 className="d-flex justify-content-between">
                LIVREE
            </h2>
            <h2 class="fs-6 d-flex justify-content-between">1200€
            </h2>
        </div> 
    </div>


</div>;
}
 
export default Mescommande;
