import React, { useContext, useEffect } from 'react';
import { useCommandes } from '../../hook/useCommandes';
import { AuthContext } from '../../context/Authcontext';
import { NavLink, Link } from 'react-router-dom';
import './Mescommandes.css';
import { useNavigate } from 'react-router-dom';

const MesCommandes = () => {
    
    const [commandes] = useCommandes();
    const userIdFromStorage = localStorage.getItem('userID');
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Filtrer les commandes pour n'obtenir que celles de l'utilisateur connecté
    const userCommandes = commandes.filter(
        (commande) => commande.userId === userIdFromStorage
    );

    const commandesByYear = userCommandes.reduce((acc, commande) => {
        const [day, month, year] = commande.orderDate.split("/").map(Number);
        const date = new Date(year, month - 1, day);
        const fullYear = date.getFullYear();

        if (!acc[fullYear]) {
            acc[fullYear] = [];
        }
        acc[fullYear].push(commande);
        return acc;
    }, {});

    const getTotalItems = (cartItems) => {
        let total = 0;
        for (const item of cartItems) {
            total += item.quantityInCart;
        }
        return total;
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/connexion", { state: { from: "/mescommande" } });
        }
      }, [isAuthenticated, navigate]);

    return (
        <div className="container-xl px-4 mt-4">
            <div className="row">
                <div className="card mb-4">
                    <div className="card-header">Historique des achats</div>
                    <div className="card-body p-0">
                        <div className="table-responsive table-billing-history">
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th className="border-gray-200" scope="col">
                                            ID Transaction
                                        </th>
                                        <th className="border-gray-200" scope="col">
                                            quantité
                                        </th>
                                        <th className="border-gray-200" scope="col">
                                            Prix
                                        </th>
                                        <th className="border-gray-200" scope="col">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(commandesByYear)
                                        .sort()
                                        .reverse()
                                        .map((year) => (
                                            <React.Fragment key={year}>
                                                {commandesByYear[year].map((commande) => (
                                                    <tr key={commande.orderId}>
                                                        <td>
                                                            <Link
                                                                to={`/macommande/${commande.orderId}`}
                                                            >
                                                                {commande.orderId} - {commande.orderDate}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {getTotalItems(commande.cartItems.cart)}
                                                        </td>
                                                        <td>
                                                            {new Intl.NumberFormat("fr-FR", {
                                                                style: 'currency',
                                                                currency: 'EUR'
                                                            }).format(commande.cartItems.total)}
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-light text-dark">
                                                                {commande.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MesCommandes;
