import React, { useRef } from "react";
import Alert from "../Alert";
import { useAlert } from "../../hook/useAlert";
import useContact from "../../hook/useContact";
import './contact.css';

const Contact = () => {
  const emailRef = useRef();
  const messageRef = useRef();
  const sujetRef = useRef();
  const [alerte, setAlerte, getError] = useAlert();
  const { isSuccess, error, handleSubmit } = useContact();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const sujet = sujetRef.current.value;
    const text = messageRef.current.value;
    handleSubmit(email, sujet, text);
    e.target.reset();
  };

  const handleFocus = () => {
    setAlerte({});
  };

  return (

    <body>
    <form action="">
        <div class="title">
            <h2>CONTACT</h2>
        </div>
        <div class="half">
            <div class="item">
                <label for="name">Nom</label>
                <input type="text" id="name" />
            </div>
            <div class="item">
                <label for="email">Email</label>
                <input
                  type="email"
                  placeholder="Votre@email.fr"
                  className="form-control mb-3"
                  ref={emailRef}
                  onFocus={handleFocus}
                />
            </div>
        </div>
        <div class="full">
            <label for="message">Message</label>
            <textarea
              placeholder="Votre message"
              className="form-control mb-3"
              rows={5}
              ref={messageRef}
              onFocus={handleFocus}
            ></textarea>
        </div>
        <div class="action">
            <input type="submit" className="btn btn-dark" />  
            
        </div>

        <div class="icons">
            <a href="" class="fa fa-twitter"></a>
            <a href="" class="fa fa-facebook"></a>
            <a href="" class="fa fa-instagram"></a>
        </div>

    </form>

</body>

    
  );
};

export default Contact;
