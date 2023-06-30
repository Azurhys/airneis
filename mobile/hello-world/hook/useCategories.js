import { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from 'react-native';
import { VITE_API } from "@env";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${VITE_API}categories.json`)
        .then((reponse) => {
            if (Array.isArray(reponse.data)) {
                setCategories(reponse.data);
            } else {
                console.error("Erreur : les données de réponse ne sont pas un tableau");
            }
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des catégories :", error);
        });
}, []);

    
  return [categories, setCategories]  ; 
}