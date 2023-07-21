# Introduction

Dans cette documentation, vous trouverez les informations concernant l'API backend du projet Airneis.

# Endpoints

## Produits
- GET /api/produits: Récupère la liste de tous les produits.
- GET /api/produits/:id: Récupère les détails d'un produit spécifique en fonction de son ID.
- POST /api/produits: Ajoute un nouveau produit à la base de données.
- PATCH /api/produits/:id: Met à jour les informations d'un produit existant en fonction de son ID.
- DELETE /api/produits/:id: Supprime un produit de la base de données en fonction de son ID.

## Clients
- GET /api/clients: Récupère les informations de tous les clients
- GET /api/clients:id Récupère les informations d'un client spécifique en fonction de son ID
- GET /api/clients:email Récupère les informations d'un client spécifique en fonction de son Email
- PATCH /api/clients:id Met à jour les informations d'un client en fonction de son ID

## Commandes
- GET /api/commandes: Récupère la liste de toutes les commandes.
- GET /api/commandes/:id: Récupère les détails d'une commande spécifique en fonction de son ID.
- POST /api/commandes: Crée une nouvelle commande avec les articles spécifiés.
- PATCH /api/commandes/:id: Met à jour le statut d'une commande existante en fonction de son ID.

## Catégories
- GET /api/categories: Récupère la liste de toutes les catégories de produits.
- GET /api/categories/:id: Récupère les détails d'une catégorie spécifique en fonction de son ID.
- PATCH /api/categories/:id: Met à jour les informations d'une catégorie existante en fonction de son ID.

## Contacts
- GET /api/contacts: Récupère la liste de tous les messages de contact reçus.
- POST /api/contacts: Ajoute un nouveau message de contact à la base de données.


# Erreurs
En cas d'erreur lors de l'appel d'un endpoint, l'API renverra un code d'erreur HTTP approprié, ainsi qu'un message d'erreur explicatif dans la réponse.