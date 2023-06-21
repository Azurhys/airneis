import { useState , useEffect } from "react";
import axios from "axios"

export function useCommandes() {
    const [commandes, setCommandes] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}commandes.json`)
         .then(reponse => {
            const resultat = []
            for(const key in reponse.data){
                if(reponse.data[key]) resultat.push({...reponse.data[key] , id : key})
            }
            setCommandes(resultat)
         }) 
    } , [commandes.length]) // exécute que lorsque la page est chargé et update
    
    return [commandes, setCommandes];
}
