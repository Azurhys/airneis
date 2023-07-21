import { cartContext } from "../../context/CartContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import useLoginValidation from "../../verif/useLoginValidation";
import './panier.css';

const Panier = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    startCheckout,
    checkoutInProgress,
    clearCart,
  } = useContext(cartContext);
  const total = cart.reduce(
    (total, product) => total + product.price * product.quantityInCart,
    0
  );
  const tva = total * 0.2;
  const userIdFromStorage = localStorage.getItem("userID");

  useEffect(() => {
    console.log(checkoutInProgress);
  }, [checkoutInProgress]);

  const handleCheckout = async () => {
    let orderNumber = Math.floor(Math.random() * 1e9);

    // Stocker le numéro de commande dans le localStorage
    localStorage.setItem("orderNumber", orderNumber);

    startCheckout();
    // Prepare the data to be sent
    const panierData = {
      user_id: userIdFromStorage,
      cart: cart,
      total: total,
      tva: tva,
      orderNumber: orderNumber,
      timestamp: Date.now(), // Set the current timestamp
    };

    localStorage.setItem("infocart", JSON.stringify(panierData));

    const updatedProducts = cart.map((product) => {
      return {
        ...product,
        quantity: product.quantity - product.quantityInCart,
        quantityInCart: 0, // reset quantityInCart
      };
    });
    try {
      await axios
        .post(`${import.meta.env.VITE_API}paniers.json`, panierData)
        .then((response) => {
          console.log("Order successfully stored");
          // Clear the cart after successfully storing the order
        })
        .catch((error) => {
          console.error("Error adding order: ", error);
        });

      await Promise.all(
        updatedProducts.map((product) =>
          axios.put(
            `${import.meta.env.VITE_API}produits/${product.product_id}.json`,
            product
          )
        )
      );
    } catch (error) {
      console.error("Error processing checkout: ", error);
    }
  };

  return (
    <div className="container">
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
          <div className="col-md-9 space-top">
            <div className="ibox">
              <div className="ibox-title">
                
                <h5>Produit(s) dans votre panier</h5>
              </div>
                <div className="ibox-content">
                    {cart.map((product, index) => (

                    <div className="table-responsive">
                    <table className="table shoping-cart-table">
                        <tbody>
                        <tr>
                            <td width="90">
                            <img src={product.image} className="cart-product-imitation" />
                            </td>
                            <td className="desc">
                            <h3 className="text-navy2">
                                <a href="#" className="text-navy">
                                    {product.name}
                                </a>
                            </h3>
                            <p className="small">
                                {product.description}
                            </p>
                            <div className="m-t-sm">
                                <a href="#" className="text-muted">
                                <i className="fa fa-trash"></i>  <button className="btn btn-danger" onClick={() => removeFromCart(product.id)}>Supprimer</button>
                                </a>
                            </div>
                            </td>
                            <td width="65">
                            <input type="number" class="w-90 gap-3 mb-3" min="1" 
                                value={product.quantityInCart} 
                                onChange={e => updateQuantity(product.id, e.target.value)} 
                            />
                            </td>
                            <td>
                            <h4>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(product.price)}</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>

                    ))}




                </div>
             
              <div className="ibox-content"></div>
              <div className="ibox-content">
                
                <button className="btn btn-white">
                  <i className="fa fa-arrow-left"></i> retour à la boutique
                </button>
              </div>


            </div>
          </div>
          <div className="col-md-3 space-top">
            <div className="ibox">
              <div className="ibox-title">
                <h5>Cart Summary</h5>
              </div>
              <div className="ibox-content">
                <span>Total</span>
                <h2 className="font-bold">{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(total)}</h2> <br /><br />
                <span>TVA</span> <br />
                <span>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(tva)}</span>
                <div className="m-t-sm">
                  <div className="btn-group" style={{ textAlign: "center" }}>
                  {cart?.length > 0 && 
                        <NavLink onClick={handleCheckout} to="/livraison" className="nav-link btn btn-brown">
                            Procéder au paiement
                        </NavLink>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
