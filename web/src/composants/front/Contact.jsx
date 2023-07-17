import React, { useRef } from "react";
import Alert from "../Alert";
import { useAlert } from "../../hook/useAlert";
import useContact from "../../hook/useContact";

const Contact = () => {
  const emailRef = useRef();
  const messageRef = useRef();
  const sujetRef = useRef();
  const [alerte, setAlerte] = useAlert();
  const { handleSubmit } = useContact();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const sujet = sujetRef.current.value;
    const text = messageRef.current.value;

    const { error } = contactVerif.validate({
      email: email,
      sujet: sujet,
      text: text,
    });

    if (error) {
      console.error(error.details[0].message);
      alert(error.details[0].message);
      return;
    }
    
    handleSubmit(email, sujet, text);
    e.target.reset();
  };

  const handleFocus = () => {
    setAlerte({});
  };

  return (
    <div className="p-5">
      <h1 className="text-center mb-3">Nous contacter</h1>
      <p>Pour nous contacter, veuillez compléter le formulaire suivant :</p>
      <div className="row">
        <form onSubmit={handleFormSubmit} className="col-12">
          <input
            type="email"
            placeholder="Votre@email.fr"
            className="form-control mb-3"
            ref={emailRef}
            onFocus={handleFocus}
          />
          <input
            type="text"
            placeholder="Sujet"
            className="form-control mb-3"
            ref={sujetRef}
            onFocus={handleFocus}
          />
          <textarea
            placeholder="Votre message"
            className="form-control mb-3"
            rows={5}
            ref={messageRef}
            onFocus={handleFocus}
          ></textarea>
          <div className="d-flex justify-content-center">
            <input type="submit" className="btn btn-dark" />
          </div>
        </form>
      </div>

      <Alert alerte={alerte} />
    </div>
  );
};

export default Contact;
