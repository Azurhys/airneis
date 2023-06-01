import React, { useContext } from 'react';
import { useCommandes } from '../../hook/useCommandes';
import { AuthContext } from '../../context/Authcontext';

const MesCommandes = () => {
    const { isAuthenticated, user_Id } = useContext(AuthContext);
    const [commandes] = useCommandes();
    const userIdFromStorage = localStorage.getItem('userID');
    
    // Filtrer les commandes pour n'obtenir que celles de l'utilisateur connecté
    const userCommandes = commandes.filter(commande => commande.userId === userIdFromStorage);

    // Triez les commandes par année
    const commandesByYear = userCommandes.reduce((acc, commande) => {
        const year = new Date(commande.date).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(commande);
        return acc;
    }, {});

    return (
        <div>
            <h1>Mes Commandes</h1>
            {Object.keys(commandesByYear).sort().reverse().map(year => (
                <div key={year}>
                    <h2>{year}</h2>
                    {commandesByYear[year].map(commande => (
                        <div key={commande.id}>
                            <p>Commande n°: {commande.orderId}</p>
                            {/* Ajoutez ici plus d'informations sur la commande si nécessaire */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default MesCommandes;
