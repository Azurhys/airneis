import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../context/Authcontext';
import { NavLink } from "react-router-dom";

const Menu = () => {
  const { isAuthenticated, userName, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

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
            <NavLink to="/Backoffice" className={({isActive}) => {
              return isActive ? "nav-link active text-light" : "nav-link"
            }}>Backoffice</NavLink>
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
