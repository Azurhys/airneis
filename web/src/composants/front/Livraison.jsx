import React, { useState } from 'react';
import { useContext } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const Livraison = () => {

    return <div className="mb-3">
        <div className="mb-5">
        <br/>
        <br/>
         <h1 className="text-center">Livraison</h1>
        </div>

        <Dropdown>
        <Dropdown.Toggle classname ="btn btn-primary " id="dropdown-basic">
            Maison
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Appartement</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        <br/>
        <div className="">

            <form className="">
            <label for="fname"className="fw-bold">Prénom</label>
            <br/>
                <input type="text"
                    name="prenom" 
                    className="mb-3" 
                />
            <br/>
                <label for="fname"className="fw-bold">Nom</label>
                <br/>
                <input type="text" 
                    name="nom" 
                    className="mb-3" 
                />
            <br/>
                <label for="fname"className="fw-bold">Adresse 1</label>
                <br/>
                <input type="text" 
                name="adresse"
                className="mb-3" 
                />
                <br/>
                <label for="fname"className="fw-bold">Adresse 2</label>
                <br/>
                <input type="text" 
                name="adresse"
                className="mb-3" 
                />
                <br/>
                <label for="fname"className="fw-bold">Ville</label>
                <br/>
                <input type="text" 
                name="ville" 
                className="mb-3" 
                />
                <br/>
                <label for="fname"className="fw-bold">Code Postal</label>
                <br/>
                <input type="text" 
                name="ville"
                className="mb-3" 
                />
            </form>
    

            <div className="">
            <a href="/Paiment" class="btn btn-primary">PASSER AU PAIMENT</a>
            </div>

        </div>
    </div>;
}
 
export default Livraison;
