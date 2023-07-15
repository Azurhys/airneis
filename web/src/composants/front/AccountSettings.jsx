import React, { useRef } from 'react';
import useConfigsetting from "../../hook/useConfigsetting";
import './AccountSettings.css';

const AccountSettings = () => {
  const fullNameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const shippingAddressRef = useRef('');
  const billingAddressRef = useRef('');
  const paymentMethodsRef = useRef([]);

  const userId = localStorage.getItem('userID');
  const { isSuccess, error, handleSubmit } = useConfigsetting();

  // Fonction pour gérer la soumission du formulaire
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(
      fullNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value,
      shippingAddressRef.current.value,
      billingAddressRef.current.value,
      paymentMethodsRef.current.value,
      userId
    );
    // Réinitialiser les champs du formulaire
    fullNameRef.current.value = '';
    emailRef.current.value = '';
    passwordRef.current.value = '';
    shippingAddressRef.current.value = '';
    billingAddressRef.current.value = '';
    paymentMethodsRef.current.value = [];
  };

  return (


    <body>
      <link href="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"></link>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
      <div className="container bootstrap snippets bootdeys">
        <div className="row">
          <div className="col-xs-12 col-sm-9">
            <form  onSubmit={handleFormSubmit} className="form-horizontal">
              
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">Informations Utilisateur</h4>
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Nom complet</label>
                    <div className="col-sm-10">
                      <input type="text" ref={fullNameRef} className="form-control"  />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">E-mail</label>
                    <div className="col-sm-10">
                      <input type="email"  ref={emailRef} className="form-control" />
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">informations livraison</h4>
                </div>
                <div className="panel-body">
                  
                  
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Adresse de livraison :</label>
                    <div className="col-sm-10">
                      <textarea rows="3" ref={shippingAddressRef} className="form-control"></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Adresse de facturation :</label>
                    <div className="col-sm-10">
                      <textarea rows="3"  ref={billingAddressRef} className="form-control"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">securite</h4>
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Mot de passe :</label>
                    <div className="col-sm-10">
                      <input type="password"  ref={passwordRef} className="form-control" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">nouveau mot de passe</label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                      <button type="submit" className="btn btn-primary">Enregistrer les modifications</button>
                      
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="https://netdna.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <script type="text/javascript">

      </script>
  </body>

    
  );
};

export default AccountSettings;
