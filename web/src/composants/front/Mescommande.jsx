import React, { useState } from "react";
import Commande from "./Commande";

const Mescommande = () => {


    return <div className="mb-3 d-block">
    <div className="mb-5">
    <br/>
    <br/>   
    <h1 className="text-center">Mes commandes</h1>
    </div>
    <h2>2022</h2>
    <br/>

<div className="">
    <div className="d-flex">
        <div className="w-25">
            <Commande />
        </div>

        <div className="">
            <h3 className="">
                EN COURS
            </h3>
            <h3 class="fs-6 d-flex">1200€
            </h3>
        </div>    
    </div>


    <div className="d-flex ">


        <div className="w-25">
            <Commande />
        </div>
        <div className="">
            <h3 className="">
                LIVREE
            </h3>
            <h2 class="fs-6 d-flex">1200€
            </h2>
        </div> 
    </div>
    
    <div className="d-flex ">

    <div className="w-25">
        <Commande />
    </div>

    <div className="">
        <h3 className="">
            ANNULER
        </h3>
        <h2 class="fs-6 d-flex ">1200€
        </h2>
    </div>    
    </div>


    <div className="d-flex ">

        <div className="w-25">
            <Commande />
        </div>

        <div className="">
            <h3 className="">
                LIVREE
            </h3>
            <h2 class="fs-6 d-flex ">1200€
            </h2>
        </div>    
    </div>

</div>

    <br/>
    <h2 className="">2021</h2>

     <br/>

    <div className="d-flex ">

        <div className="w-25">
            <Commande />
        </div>

        <div className="">
            <h3 className="">
                LIVREE
            </h3>
            <h3 class="fs-6 d-flex ">1200€
            </h3>
        </div>    
    </div>


    <div className="d-flex ">


        <div className="w-25">
            <Commande />
        </div>
        <div className="">
            <h3 className="">
                LIVREE
            </h3>
            <h2 class="fs-6 d-flex ">1200€
            </h2>
        </div> 
    </div>


</div>;
}
 
export default Mescommande;
