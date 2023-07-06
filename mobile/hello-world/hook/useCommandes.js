import { useState, useEffect } from "react";
import { VITE_API } from "@env";
import axios from "axios";

export function useCommandes() {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    axios.get(`${VITE_API}commandes.json`)
      .then(response => {
        const resultat = [];
        for (const key in response.data) {
          if (response.data[key]) resultat.push({ ...response.data[key], id: key });
        }
        setCommandes(resultat);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return [commandes, setCommandes];
}
