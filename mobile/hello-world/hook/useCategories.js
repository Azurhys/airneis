import { useState, useEffect } from "react";
import axios from "axios";
import { VITE_API } from "@env";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${VITE_API}categories.json`)
      .then((reponse) => {
        const resultat = [];
        for (const key in reponse.data) {
          if (reponse.data[key]) resultat.push({ ...reponse.data[key], id: key });
        }
        setCategories(resultat);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
        setIsLoading(false);
      });
  }, [categories.length]); 

  return [categories, setCategories, isLoading];
}
