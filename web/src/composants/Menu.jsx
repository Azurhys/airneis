import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AuthContext } from '../context/Authcontext';
import { NavLink } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';

const Menu = () => {
  const { isAuthenticated, userName, logout, categorie_user_Id } = useContext(AuthContext);
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
            <NavLink to="/" className="nav-link brand text-light fs-2">AIRNEIS</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          {isAuthenticated ? (
            <li className="nav-item">
            <span className="nav-link text-light">Bienvenue {userName}</span>
            </li>
            ) : null}
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
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-menu">
                <img src="/list.svg" alt="list" width="28" height="28" />
              </Dropdown.Toggle>
              {isAuthenticated ? (
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/settings">Mes paramètres</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/Mescommande">Mes commandes</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/cgu">CGU</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/mentions-legales">Mentions Légales</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/contact">Contact</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/">À propos d’ÀIRNEIS</Dropdown.Item>
                  {categorie_user_Id === 1 && isAuthenticated ? (
                    
                    <Dropdown.Item as={NavLink} to="/backoffice">Backoffice</Dropdown.Item>
                  ) : null}
                  <Dropdown.Item><button onClick={handleLogout} className="btn btn-br">Déconnexion</button></Dropdown.Item>
                </Dropdown.Menu>
              )
              :(
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/connexion">Se Connecter</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/inscription">S'inscrire</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/cgu">CGU</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/mentions-legales">Mentions Légales</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/contact">Contact</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/">À propos d’ÀIRNEIS</Dropdown.Item>
              </Dropdown.Menu>
               )}
            </Dropdown>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
