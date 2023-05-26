import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const Paiment = () => {

return <div className="d-flex flex-column gap-3 mb-3 w-75 ">

    <div className="mb-5">
        <h1 className="text-center">Paiment</h1>
    </div>

    <Dropdown>
        <Dropdown.Toggle classname ="btn btn-primary" id="dropdown-basic">
            Master Card 7812
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Master Card 0492</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Master Card 9649</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Master Card 2456</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>

    <div className="">
            <form classname="">
            <label htmlFor="cardNumber"className="fw-bold">Numéro de carte de crédit </label>
            <br />
            <input type="text"></input>

            <br />
            <label htmlFor="cardholderName"className="fw-bold">Nom complet </label>
            <br />
            <input type="text "></input>

            <br />

            <div className="w-80">
            <label htmlFor="expirationDate"className="fw-bold">Date d'expiration </label>
            <br />
            <input type="text"></input>
            <br />

            <label htmlFor="cvv"className="fw-bold">Code de sécurité (CVV) </label>
            <br />
            <input type="text"></input>

            </div>

            <br />
            <br />
            <a href="/ConfirmationPaiment" class="btn btn-primary">PASSER LA COMMANDE</a>
            </form>
    </div>

    </div>;
}

export default Paiment;
