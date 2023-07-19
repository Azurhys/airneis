import React from "react";
import'./ConfirmationPaiement.css';
import { AuthContext } from "../../context/Authcontext";

const ConfirmationPaiment = () => {
  const orderNumberFromStorage = localStorage.getItem('orderNumber');
  const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/connexion", { state: { from: "/panier" } });
        }
      }, [isAuthenticated, navigate]);

  return (
    <body>
      <table class="body-wrap">
        <tbody>
          <tr>
            <td></td>
            <td class="container" width="600">
              <div class="content">
                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td class="content-wrap aligncenter" style={{ marginTop: "300px" }}>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td class="content-block">
                                <h2>Commande Effectue</h2>
                              </td>
                            </tr>
                            <tr>
                              <td class="content-block">
                                <table class="invoice">
                                  <tbody>
                                    <tr>
                                      <td>Merci de votre achat !<br /></td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Votre commande à bien été enregistrée sous le numéro {orderNumberFromStorage}.<br /><br />
                                        Vous pouvez suivre son état depuis votre espace client.<br />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td class="content-block">
                                <a href="#">Continuer mes achats</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="https://netdna.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
      <script type="text/javascript"></script>
    </body>
  );
};

export default ConfirmationPaiment;
