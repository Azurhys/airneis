import React, { useState } from 'react';
import { useContext } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const Livraison = () => {

    return <div className="d-flex flex-column gap-3 mb-3 w-75 ">
        <div className="mb-5">
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

        <div className=" d-flex gap-3">

            <form className="">
            <label for="fname"className="fw-bold">Prénom</label>
                <input type="text"
                    name="prenom" 
                    className="form-control mb-3 w-30" 
                    />
                <label for="fname"className="fw-bold">Nom</label>
                <input type="text" 
                    name="nom" 
                    className="form-control mb-3" 
                    />
                <label for="fname"className="fw-bold">Adresse 1</label>
                <input type="text" 
                name="adresse"
                className="form-control mb-3" 
                />
                <label for="fname"className="fw-bold">Adresse 2</label>
                <input type="text" 
                name="adresse"
                className="form-control mb-3" 
                />
                <label for="fname"className="fw-bold">Ville</label>
                <input type="text" 
                name="ville" 
                className="form-control mb-3" 
                />
                <label for="fname"className="fw-bold">Code Postal</label>
                <input type="text" 
                name="ville"
                className="form-control mb-3" 
                />
            </form>
    

            <div className="w-50">
            <a href="/Paiment" class="btn btn-primary">PASSER AU PAIMENT</a>
            </div>

        </div>
    </div>;
}
 
export default Livraison;
