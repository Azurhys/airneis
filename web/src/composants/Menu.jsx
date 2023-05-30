import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../context/Authcontext';
import { NavLink } from "react-router-dom";

const Menu = () => {
  const { isAuthenticated, userName, logout, categoryId } = useContext(AuthContext);
  console.log(categoryId)
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-brown mb-0 ">
      <nav className="navbar navbar-expand navbar-dark container">
        <span className="navbar-brand">
          {/** image en svg getbootstrap.com  */}
        </span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <span className="nav-link brand text-light fs-2">AIRNEIS</span>
          </li>
        </ul>
        <ul className='navbar-nav'>
          <li className="nav-item">
          <NavLink to="/produit/0" className={({isActive}) => {
              return isActive ? "nav-link active text-light" : "nav-link"
            }}>Produit</NavLink>
          </li>


          {isAuthenticated && (
          <li className="nav-item">
            <NavLink to="/Backoffice" className={({ isActive }) => {
              return isActive ? "nav-link active text-light" : "nav-link";}}>Backoffice
            </NavLink>
          </li>
          )}
          <NavLink to="/Backoffice" className={({isActive}) => {
              return isActive ? "nav-link active text-light" : "nav-link"}}>Backoffice
            </NavLink>
          {/* {categoryId === 1 && isAuthenticated ? (
                    
            <li className="nav-item">
            <NavLink to="/Backoffice" className={({isActive}) => {
              return isActive ? "nav-link active text-light" : "nav-link"}}>Backoffice
            </NavLink>
            </li>
          ) : null} */}
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
                        <NavLink to="/paiement" className="nav-link text-light">
                            Paiement
                        </NavLink>
                    </li>

          

          <li className="nav-item">
            <NavLink to="/categorie/0" className={({isActive}) => {
              return isActive ? "nav-link active text-light" : "nav-link"
            }}>Categorie</NavLink>
          </li>

          {isAuthenticated ? (
            <li className="nav-item">
              <button onClick={handleLogout} className="nav-link">Déconnexion</button>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink to="/connexion" className="nav-link">
                Connexion
              </NavLink>
            </li>
          )}

                <li className="nav-item">
                    <NavLink to="/settings" className={({isActive}) => {
                        return isActive ? "nav-link active text-light" : "nav-link"
                    }}>AccountSettings</NavLink>
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
              <img src="/search.svg" alt="search" width="28" height="28" />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/panier" className="nav-link">
              <img src="/cart.svg" alt="cart" width="28" height="28" />
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              <img src="/list.svg" alt="list" width="28" height="28" />
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li className="nav-item">
            <span className="nav-link text-light">{userName}</span>
            </li>
            ) : null}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
