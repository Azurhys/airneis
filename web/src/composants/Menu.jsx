//import "" ;

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavLink , useNavigate } from "react-router-dom"

const Menu = () => {
    return ( 

        <div className="bg-primary mb-0">
            <nav className="navbar navbar-expand navbar-dark container">
                <span className="navbar-brand">
                    {/** image en svg getbootstrap.com  */}
                </span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="nav-link">AIRNEIS</span>
                    </li>
                </ul>
                <ul className='navbar-nav'>
                <li className="nav-item">
                        <NavLink to="/produit" className="nav-link text-light">
                            Produit
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/livraison" className="nav-link text-light">
                        Livraison
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Mescommande" className="nav-link text-light">
                        Commandes
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/paiment" className="nav-link text-light">
                            Paiment
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Backoffice" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Backoffice</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Accueil</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink to="/recherche" className="nav-link">
                            <img src="/search.svg" alt="search" width="28" height="28" /></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/panier" className="nav-link">
                            <img src="/cart.svg" alt="cart" width="28" height="28" /></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            <img src="/list.svg" alt="list" width="28" height="28" /></NavLink>
                    </li>
                </ul>
            </nav>
        </div>
     );
}
 
export default Menu;