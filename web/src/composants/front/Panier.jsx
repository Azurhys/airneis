import PanierProduit from "./PanierProduit";

const Panier = () => {


    return <div className="d-flex flex-column gap-3 mb-3 w-75 mx-5">
        <div className="mb-5">
        <br/>
         <h1 className="text-center">Panier</h1>
        </div>

        <div className="d-flex gap-3">

            <div className="w-50">
                <PanierProduit qty="3" />
                <PanierProduit qty="1" />
                <PanierProduit qty="15" />
            </div>

            <div className="w-50">
                <h2 className="d-flex justify-content-between">
                    Total
                    <span>3600€</span>
                </h2>
                <h2 class="text-muted fs-6 d-flex justify-content-between">TVA
                <span>800€</span>
                </h2>
                <a href="" class="btn btn-primary">PASSER LA COMMANDE</a>
            </div>

            
        </div>
        
        


    </div>;
}
 
export default Panier;
