import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { cartContext } from '../../context/CartContext';
import { carteVerif, adresseVerif } from '../../verif/verifForm';

function getRandomStatus() {
    const statuses = ['EN COURS', 'LIVRÉE', 'EXPÉDIÉE'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

const Paiment = () => {
    const navigate = useNavigate();
    const { isAuthenticated, userName, logout } = useContext(AuthContext);
    const userIdFromStorage = localStorage.getItem('userID');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const { cart, updateQuantity, removeFromCart, startCheckout, checkoutInProgress, clearCart } = useContext(cartContext);
    const orderNumberFromStorage = localStorage.getItem('orderNumber');
    const [useDeliveryAddress, setUseDeliveryAddress] = useState(false);
    const [billingAddresses, setBillingAddresses] = useState([]);
    

    const initialBillingAddress = {
        prenom: '',
        nom: '',
        adresse1: '',
        adresse2: '',
        ville: '',
        codePostal: '',
        pays: '',
        telephone: '',
    };
    const [billingAddress, setBillingAddress] = useState(initialBillingAddress);
    const [billingDetails, setBillingDetails] = useState(initialBillingAddress);

    const handleBillingDetailsChange = e => {
        setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
    };
    
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/connexion", { state: { from: "/panier" } });
        }
        fetchPaymentOptions();
        fetchBillingAddresses();
    }, [isAuthenticated, navigate]);

    const handleUseDeliveryAddressChange = (event) => {
        setUseDeliveryAddress(event.target.checked);
        if (event.target.checked) {
            const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
            setBillingAddress(deliveryAddress);
        } else {
            setBillingAddress(billingDetails);
        }
    };
    

    const fetchPaymentOptions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}facturation.json`);
            const paymentCards = Object.values(response.data).filter(card => card.user_Id === userIdFromStorage);
            setPaymentOptions(paymentCards);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchBillingAddresses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}billingAddress.json`);
            const addresses = Object.values(response.data).filter(address => address.user_Id === userIdFromStorage);
            setBillingAddresses(addresses);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePaymentSelect = (payment) => {
        setSelectedPayment(payment);
        setCardName(payment.cardName);
        setCardNumber(payment.cardNumber);
        setExpiryDate(payment.expiryDate);
        setCvv(payment.cvv);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
        const billingAddressToUse = useDeliveryAddress ? deliveryAddress : billingDetails;
        setBillingAddress(billingAddressToUse);
        
        const { error: errorCarte } = carteVerif.validate({
            cardName: cardName,
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
          });
          if (errorCarte) {
            console.error(errorCarte.details[0].message);
            alert(errorCarte.details[0].message);
            return;
          }
        
        const addressExists = billingAddresses.some(address => 
            address.prenom === billingAddressToUse.prenom &&
            address.nom === billingAddressToUse.nom &&
            address.adresse1 === billingAddressToUse.adresse1 &&
            address.adresse2 === billingAddressToUse.adresse2 &&
            address.ville === billingAddressToUse.ville &&
            address.codePostal === billingAddressToUse.codePostal &&
            address.pays === billingAddressToUse.pays &&
            address.telephone === billingAddressToUse.telephone
        );
        
        const { error: errorFacturation } = adresseVerif.validate(billingAddressToUse);

        if (errorFacturation) {
        console.error(errorFacturation.details[0].message);
        alert(errorFacturation.details[0].message);
        return;
        }

        if (!addressExists) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API}billingAddress.json`, { ...billingAddressToUse, user_Id: userIdFromStorage });
                if (response.status === 200) {
                    console.log("Adresse de facturation enregistrée");
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (!selectedPayment) {
            const data = {
                user_Id: userIdFromStorage,
                cardName: cardName,
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
            };
            // Stocker les détails de paiement dans le localStorage
            localStorage.setItem('paymentDetails', JSON.stringify(data));
            try {
                const response = await axios.post(`${import.meta.env.VITE_API}facturation.json`, data);
                if (response.status === 200) {
                    console.log("Payment information registered");
                    navigate("/confirmationpaiment");
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("Payment information already exists");
            localStorage.setItem('paymentDetails', JSON.stringify(selectedPayment));
            navigate("/confirmationpaiment");
        }

        const cartItems = JSON.parse(localStorage.getItem('infocart'));
            // const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'));
            const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));
            const userId = localStorage.getItem('userID');
            
            const today = new Date();
            const formattedDate = today.toLocaleDateString('fr-FR');


            // Créer l'objet de la commande
            const order = {
                orderId: orderNumberFromStorage,
                userId: userId,
                cartItems: cartItems,
                deliveryAddress: deliveryAddress,
                paymentMethod: paymentDetails,
                orderDate: formattedDate,
                billingAddress: billingAddressToUse,
                status: getRandomStatus()
            };

            // Stocker la commande dans la base de données
            try {
                // Envoyer les données à l'API avec axios
                const response = await axios.put(`${import.meta.env.VITE_API}commandes/${order.orderId}.json`, order);
                
                // Si tout se passe bien, affiche un message dans la console
                if (response.status === 200) {
                    console.log("Commande enregistrée");

                    // Effacer le panier, l'adresse de livraison et les détails de paiement du localStorage
                    localStorage.removeItem('infocart');
                    localStorage.removeItem('cart');
                    localStorage.removeItem('deliveryAddress');
                    localStorage.removeItem('paymentDetails');
                    clearCart();
                }
            } catch (error) {
                console.error(error);
            }
    };

    return (<>
        <div className="mb-5">
                <br/>
                <br/>
                <h1 className="text-center">Paiement</h1>
            </div>
        <div className="mb-3 mx-5 d-flex">
            
            <div className="w-50">
                <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Choisissez une option de paiement
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {paymentOptions.map(payment => 
                            <Dropdown.Item 
                                key={payment.cardNumber}
                                onClick={() => handlePaymentSelect(payment)}>
                                {payment.cardName} - {payment.cardNumber}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <br/>

                <form>
                    <label className="fw-bold">Nom sur la carte</label>
                    <br/>
                    <input type="text"
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                    />
                    <br/>
                    <label className="fw-bold">Numéro de carte</label>
                    <br/>
                    <input type="text"
                        pattern="\d*"
                        maxLength="16"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                    />
                    <br/>
                    <label className="fw-bold">Date d'expiration</label>
                    <br/>
                    <input type="text"
                        pattern="(0[1-9]|1[0-2])\/\d{2}"
                        maxLength="5"
                        value={expiryDate}
                        onChange={e => setExpiryDate(e.target.value)}
                    />
                    <br/>
                    <label className="fw-bold">CVV</label>
                    <br/>
                    <input type="text"
                        pattern="\d{3}"
                        maxLength="3"
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                    />
                </form>
            </div> 
            <div className="w-50">
                    <div className="my-3">
                        <input type="checkbox" checked={useDeliveryAddress} onChange={handleUseDeliveryAddressChange} />
                        <label>Utilisez l'adresse de livraison comme adresse de facturation</label>
                        <Dropdown>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                Choisissez une adresse de facturation
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {billingAddresses.map((address, index) => 
                                    <Dropdown.Item 
                                        key={index}
                                        onClick={() => setBillingDetails(address)}>
                                        {address.prenom} {address.nom} - {address.adresse1}, {address.ville}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>

                    {!useDeliveryAddress && (
                        <form className="">
                        <label htmlhtmlFor="fname"className="fw-bold">Prénom</label>
                        <br/>
                            <input type="text"
                                name="prenom" 
                                className="mb-3" 
                                value={billingDetails.prenom}
                                onChange={handleBillingDetailsChange}
                            />
                        <br/>
                            <label htmlFor="fname"className="fw-bold">Nom</label>
                            <br/>
                            <input type="text" 
                                name="nom" 
                                className="mb-3" 
                                value={billingDetails.nom}
                                onChange={handleBillingDetailsChange}
                            />
                        <br/>
                            <label htmlFor="fname"className="fw-bold">Adresse 1</label>
                            <br/>
                            <input type="text" 
                            name="adresse1"
                            className="mb-3" 
                            value={billingDetails.adresse1}
                            onChange={handleBillingDetailsChange}
                            />
                            <br/>
                            <label htmlFor="fname" className="fw-bold">Adresse 2</label>
                            <br/>
                            <input type="text" 
                            name="adresse2"
                            className="mb-3" 
                            value={billingDetails.adresse2}
                            onChange={handleBillingDetailsChange}
                            />
                            <br/>
                            <label htmlFor="fname" className="fw-bold">Ville</label>
                            <br/>
                            <input type="text" 
                            name="ville" 
                            className="mb-3" 
                            value={billingDetails.ville}
                            onChange={handleBillingDetailsChange}
                            />
                            <br/>
                            <label htmlFor="fname"className="fw-bold">Code Postal</label>
                            <br/>
                            <input type="number" 
                            name="codePostal"
                            className="mb-3" 
                            value={billingDetails.codePostal}
                            onChange={handleBillingDetailsChange}
                            />
                            <br/>
                            <label htmlFor="pays" className="fw-bold">Pays</label>
                            <br/>
                            <input type="text" 
                            name="pays"
                            className="mb-3" 
                            value={billingDetails.pays}
                            onChange={handleBillingDetailsChange}
                            />
                            <br/>
                            <label htmlFor="telephone" className="fw-bold">Numéro de téléphone</label>
                            <br/>
                            <input type="tel" 
                                name="telephone"
                                className="mb-3" 
                                value={billingDetails.telephone}
                                maxLength={10}
                                onChange={handleBillingDetailsChange}
                            />
                            <br/>
                        </form>
                    )}

            </div>      
            <div className="my-3">
                <button onClick={handleSubmit} className="nav-link btn btn-brown">
                    Procéder à la confirmation 
                </button>
            </div>

        </div>
        </>
    );
}
 
export default Paiment;
