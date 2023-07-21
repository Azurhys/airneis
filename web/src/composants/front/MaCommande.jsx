import { useParams } from 'react-router-dom';
import { useCommandes } from '../../hook/useCommandes';
import axios from 'axios';
import { useState } from 'react';
import './order_details.css';
import { AuthContext } from '../../context/Authcontext';

const MaCommande = () => {
  const { orderId } = useParams();
  const [commandes] = useCommandes();
  const commande = commandes.find((commande) => commande.orderId === orderId);

  const [tempQuantities, setTempQuantities] = useState({});
  const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/connexion", { state: { from: "/mescommande" } });
        }
      }, [isAuthenticated, navigate]);

  const handleQuantityChange = (productId, newQuantity) => {
    setTempQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const handleReturnProduct = (productId) => {
    updateQuantityInOrder(productId, tempQuantities[productId]);
  };

  if (!commande) {
    return null;
  }

  const {
    orderDate,
    orderStatus,
    deliveryAddress,
    billingAddress,
    paymentMethod,
    cartItems,
  } = commande;
  let total = commande.cartItems.total;

  const handleCancelOrder = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API}commandes/${orderId}.json`,
        { ...commande, status: 'ANNULÉE' }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturn = async (productId, quantity) => {
    const confirmReturn = window.confirm(
      'Êtes-vous sûr de vouloir retourner ce produit ?'
    );

    if (!confirmReturn) {
      return;
    }

    let newCommande = { ...commande };
    newCommande.cartItems.cart.forEach((item) => {
      if (item.id === productId) {
        item.quantityInCart -= quantity;
      }
    });

    await axios.put(
      `${import.meta.env.VITE_API}commandes/${orderId}.json`,
      newCommande
    );

    const productResponse = await axios.get(
      `${import.meta.env.VITE_API}produits/${productId}.json`
    );
    let productData = productResponse.data;
    productData.stock += quantity;
    await axios.put(
      `${import.meta.env.VITE_API}produits/${productId}.json`,
      productData
    );

    window.location.reload();
  };

  const updateQuantityInOrder = async (productId, newQuantity) => {
    let itemInOrder;
    const newCartItems = commande.cartItems.cart.map((item) => {
      if (item.product_id === productId) {
        itemInOrder = item;
        return { ...item, quantityInCart: newQuantity };
      } else {
        return item;
      }
    });

    if (!itemInOrder) {
      console.error(
        `Le produit avec l'id ${productId} n'a pas été trouvé dans la commande.`
      );
      return;
    }

    const quantityDifference = itemInOrder.quantityInCart - newQuantity;

    const newCommande = {
      ...commande,
      cartItems: { ...commande.cartItems, cart: newCartItems },
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_API}commandes/${orderId}.json`,
        newCommande
      );

      const productsResponse = await axios.get(
        `${import.meta.env.VITE_API}produits.json`
      );
      const products = productsResponse.data;

      for (const key in products) {
        if (products[key].product_id === productId) {
          const updatedProduct = {
            ...products[key],
            quantity: products[key].quantity + quantityDifference,
          };
          await axios.put(
            `${import.meta.env.VITE_API}produits/${key}.json`,
            updatedProduct
          );
          break;
        }
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <body>
      <div className="container-fluid">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-3">
            <h2 className="h5 mb-0">
              <a href="#" className="text-muted"></a> Commande #{orderId}
            </h2>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="mb-3 d-flex justify-content-between">
                    <div>
                      <span className="me-3">
                        Commande #{orderId} - {orderDate} -{' '}
                      </span>
                      <span className="badge rounded-pill bg-info">
                        {commande.status}
                      </span>

                      {commande.status === 'EN COURS' && (
                        <button
                          className="btn btn-danger"
                          onClick={handleCancelOrder}
                        >
                          Annuler la commande
                        </button>
                      )}
                    </div>
                  </div>
                  {cartItems.cart.map((product, index) => (
                    <table className="table table-borderless" key={index}>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex mb-2">
                              <div className="flex-shrink-0">
                                <img
                                  src={product.image}
                                  alt=""
                                  width="80px"
                                  className="img-fluid product-image"
                                  
                                />
                              </div>
                              <div className="flex-lg-grow-1 ms-3">
                                <h6 className="small mb-0">
                                  <a href="#" className="text-reset">
                                    {product.name}
                                  </a>
                                </h6>
                                <span className="small">
                                  {product.description}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            {commande.status === 'EN COURS' && (
                              <input
                                type="number"
                                className="w-90 gap-3 mb-3"
                                min="0"
                                max={product.quantityInCart}
                                value={
                                  tempQuantities[product.product_id] ||
                                  product.quantityInCart
                                }
                                onChange={(e) =>
                                  handleQuantityChange(
                                    product.product_id,
                                    e.target.value
                                  )
                                }
                              />
                            )}
                            {(commande.status === 'ANNULÉE' ||
                              commande.status === 'LIVRÉE' ||
                              commande.status === 'EXPÉDIÉE') && (
                              <span>{product.quantityInCart}</span>
                            )}
                            <i className="bi bi-trash d-flex flex-column "></i>
                            {commande.status === 'EN COURS' && (
                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  handleReturnProduct(product.product_id)
                                }
                              >
                                Faire un retour du produit
                              </button>
                            )}
                          </td>
                          <td className="text-end">
                            {new Intl.NumberFormat('fr-FR', {
                              style: 'currency',
                              currency: 'EUR',
                            }).format(product.price)}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot></tfoot>
                    </table>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="h6">Total</h3>
                  <p>prix + tva</p>
                  <span>{total * 0.2}€</span>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="h6">Adresse de livraison</h3>
                  <address>
                    <strong>
                      {deliveryAddress.prenom} {deliveryAddress.nom}
                    </strong>
                    <br />
                    {deliveryAddress.adresse1} <br />
                    {deliveryAddress.adresse2} <br />
                    {deliveryAddress.codePostal} {deliveryAddress.ville} <br />
                    {deliveryAddress.pays} <br />
                    {deliveryAddress.telephone}
                  </address>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="h6">Adresse de facturation</h3>
                  <address>
                    <strong>
                      {' '}
                      {billingAddress.prenom} {deliveryAddress.nom}{' '}
                    </strong>
                    <br />
                    {billingAddress.adresse1} <br />
                    {billingAddress.adresse2} <br />
                    {billingAddress.codePostal} {deliveryAddress.ville} <br />
                    {billingAddress.pays} <br />
                    {billingAddress.telephone}
                  </address>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="h6">Méthode de paiement</h3>
                  <p>
                    {'**** **** **** ' +
                      paymentMethod.cardNumber.slice(-4)}
                    <br />
                   
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      <script type="text/javascript"></script>
    </body>
  );
};

export default MaCommande;
