import PanierProduit from "./PanierProduit";
import { cartContext } from "../../context/CartContext";
import { useContext } from "react";

const Panier = () => {
    const { cart } = useContext(cartContext);
    const total = cart.reduce((total, product) => total + product.price * product.quantityInCart, 0);
    const tva = total * 0.2;
    

    return <div className="d-flex flex-column gap-3 mb-3 w-90 mx-5">
        <div className="mb-5 ">
        <br/>
         <h1 className="text-center">Panier</h1>
        </div>
        <div className="w-50">
        <div>
        
            {cart.map((product, index) => (
                <div className="d-flex gap-3 mb-5">
                <div className="image w-25">
                    <img src={product.image} class="img-fluid" />
                </div>
                <div className="w-50">
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                </div>
                <div className="w-25">
                    <p>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(product.price)}</p>
                    <input type= "text" class="w-25 gap-3 mb-3" value={product.quantityInCart}/>
                    <i class="bi bi-trash d-flex flex-column "></i>
                </div>
            
            
                </div>
            ))}
        </div>
        <div className="d-flex">
                <div className="w-50">
                    <h2 className="d-flex justify-content-between">
                        Total
                        <span>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(total)}</span>
                    </h2>
                    <h2 class="text-muted fs-6 d-flex justify-content-between">TVA
                    <span>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(tva)}</span>
                    </h2>
                    <a href="" class="btn btn-primary">PASSER LA COMMANDE</a>
                </div>
        </div>      
        </div>


    </div>;
}
 
export default Panier;
