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
        const [day, month, year] = commande.orderDate.split("/").map(Number); // convertir en tableau de nombres
        const date = new Date(year, month - 1, day); // créer un objet Date
        const fullYear = date.getFullYear(); // obtenir l'année complète (4 chiffres)

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

    return (
        <div>
            <h1 className='text-center my-5'>Mes Commandes</h1>
            <div className='text-center'>
                <div className='d-flex  flex-column'>
                {Object.keys(commandesByYear).sort().reverse().map(year => (
                    <div key={year}>
                        <h1>{year}</h1>
                        {commandesByYear[year].map(commande => (
                            <div key={commande.id} className='d-flex flex-wrap my-3'>
                                <h4 className='w-50'>{commande.orderDate} - {commande.orderId}</h4>
                                <h4 className='w-50'>{commande.status}</h4>
                                <br />
                                <h5 className='w-50 text-secondary'>{getTotalItems(commande.cartItems.cart)} articles</h5>
                                <h5 className='w-50'>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(commande.cartItems.total)}</h5>
                                {/* Ajoutez ici plus d'informations sur la commande si nécessaire */}
                            </div>
                        ))}
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default MesCommandes;
