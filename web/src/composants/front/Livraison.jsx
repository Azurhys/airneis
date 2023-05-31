import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { AuthContext } from '../../context/Authcontext';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Livraison = () => {
    const navigate = useNavigate();
    const { isAuthenticated, userName, logout, user_Id } = useContext(AuthContext);
    const userIdFromStorage = localStorage.getItem('userID');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/connexion"); // or the path of your login page
        }
    }, [isAuthenticated, navigate]);

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [adresse1, setAdresse1] = useState('');
    const [adresse2, setAdresse2] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userIdFromStorage)
        // Données du formulaire à envoyer
        const data = {
            user_Id: userIdFromStorage,
            prenom: prenom,
            nom: nom,
            adresse1: adresse1,
            adresse2: adresse2,
            ville: ville,
            codePostal: codePostal,
        };
        console.log(data)
        try {
            // Envoyer les données à l'API avec axios
            const response = await axios.post(`${import.meta.env.VITE_API}adresses.json`, data);
        
            // Si tout se passe bien, affiche un message dans la console
            if (response.status === 200) {
                console.log("Adresse enregistrée");
                // Naviguer vers la page de paiement
                navigate("/paiement");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        
    <div className="mb-3 mx-5">
        <div className="mb-5">
        <br/>
        <br/>
         <h1 className="text-center">Livraison</h1>
        </div>

        <Dropdown>
        <Dropdown.Toggle classname ="btn btn-brown " id="dropdown-basic">
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
            <label htmlhtmlFor="fname"className="fw-bold">Prénom</label>
            <br/>
                <input type="text"
                    name="prenom" 
                    className="mb-3" 
                    value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                />
            <br/>
                <label htmlFor="fname"className="fw-bold">Nom</label>
                <br/>
                <input type="text" 
                    name="nom" 
                    className="mb-3" 
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                />
            <br/>
                <label htmlFor="fname"className="fw-bold">Adresse 1</label>
                <br/>
                <input type="text" 
                name="adresse1"
                className="mb-3" 
                value={adresse1}
                onChange={e => setAdresse1(e.target.value)}
                />
                <br/>
                <label htmlFor="fname" className="fw-bold">Adresse 2</label>
                <br/>
                <input type="text" 
                name="adresse2"
                className="mb-3" 
                value={adresse2}
                onChange={e => setAdresse2(e.target.value)}
                />
                <br/>
                <label htmlFor="fname" className="fw-bold">Ville</label>
                <br/>
                <input type="text" 
                name="ville" 
                className="mb-3" 
                value={ville}
                onChange={e => setVille(e.target.value)}
                />
                <br/>
                <label htmlFor="fname"className="fw-bold">Code Postal</label>
                <br/>
                <input type="number" 
                name="codePostal"
                className="mb-3" 
                value={codePostal}
                onChange={e => setCodePostal(e.target.value)}
                />
            </form>
    

            <div className="">
            <NavLink onClick={handleSubmit} to="/paiement" className="nav-link btn btn-brown">
                Procéder au paiement. 
            </NavLink>
            </div>

        </div>
    </div>);
}
 
export default Livraison;
