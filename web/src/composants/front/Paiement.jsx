import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

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

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/connexion");
        }
        fetchPaymentOptions();
    }, [isAuthenticated, navigate]);

    const fetchPaymentOptions = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}facturation.json`);
            const paymentCards = Object.values(response.data).filter(card => card.user_Id === userIdFromStorage);
            setPaymentOptions(paymentCards);
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
        if (!selectedPayment) {
            const data = {
                user_Id: userIdFromStorage,
                cardName: cardName,
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv
            };
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
            navigate("/confirmationpaiment");
        }
    };

    return (
        <div className="mb-3 mx-5">
            <div className="mb-5">
                <br/>
                <br/>
                <h1 className="text-center">Paiement</h1>
            </div>

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

            <div className="my-3">
                <button onClick={handleSubmit} className="nav-link btn btn-brown">
                    Procéder à la confirmation 
                </button>
            </div>

        </div>
    );
}
 
export default Paiment;
