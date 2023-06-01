import PanierProduit from "./PanierProduit";

const MaCommande = () => {

    return ( <>
    <div className="text-center my-5">
    <h1>Commande #NUMERO - DATE - ETAT </h1>
    </div>
    <div className="d-flex gap-3 mx-5">

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
                <h2 className="my-3">Adresse de livraison</h2>
                Prénom NOM <br />
                Adresse <br />
                CP Ville <br />
                PAYS <br />
                N° tel <br />
                <h2 className="my-3">Adresse de facturation</h2>
                Prénom NOM<br />
                Adresse<br />
                CP Ville<br />
                PAYS<br />
                N° tel
                <h2 className="my-3">Méthode de paiement</h2>
                Carte de crédit<br />
                **** **** **** 4923
            </div>

            
        </div>

    </> );
}
 
export default MaCommande;