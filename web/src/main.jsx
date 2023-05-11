import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
//import "bootstrap-icons/font/bootstrap-icons.css"
import Menu from './composants/Menu';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Cgu from './composants/front/Cgu';
import MentionsLegales from './composants/front/Mentionslegales';
import Contact from './composants/front/Contact';
import Accueil from './composants/front/Accueil';

import Table from './composants/front/Categorie/Table'
import Meuble from './composants/front/Categorie/Meuble'
import Lit from './composants/front/Categorie/Lit'

import Produit from './composants/front/Produit';
import Panier from './composants/front/Panier';
import AccountSettings from './composants/front/AccountSettings';

import Inscription from './composants/front/Inscription';
import Connexion from './composants/front/Connexion';
import Recherche from './composants/front/Recherche';
import './app.css'
import Backoffice from './composants/front/backoffice';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}> 
        <Route index element={<Accueil />} />

        <Route path='Categorie/Table' element={<Table />} />
        <Route path='Categorie/Meuble' element={<Meuble />} />
        <Route path='Categorie/Lit' element={<Lit />} />

        <Route path='Inscription' element={<Inscription />} />
        <Route path='Connexion' element={<Connexion />} />
        <Route path='Backoffice' element={<Backoffice />} />
        <Route path='CGU' element={<Cgu />} />
        <Route path='Mentions-Legales' element={<MentionsLegales />} />
        <Route path='Contact' element={<Contact />} />
        <Route path='settings' element={<AccountSettings />} />
        <Route path='recherche' element={<Recherche />} />
        <Route path="panier" element={<Panier />} />
        <Route path="Menu" element={<Menu />} />
        <Route path='produit' element={<Produit />} />
      </Route>    
    </Routes>
  </BrowserRouter>
    
)
