import { useState, useEffect } from "react";
import axios from "axios";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}categories.json`)
      .then(response => {
        const resultat = [];
        for (const key in response.data) {
          if (response.data[key]) {
            resultat.push({ ...response.data[key], id: key });
          }
        }
        setCategories(resultat);
      });
  }, []); // exécute que lorsque la page est chargé et update

  const updateCategory = async (id, updatedCategory) => {
    try {
      await axios.put(`${import.meta.env.VITE_API}categories/${id}.json`, updatedCategory)
      setCategories(prevCategories => {
        return prevCategories.map(category => category.id === id ? updatedCategory : category);
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie : ", error);
    }
  };

  return [categories, setCategories, updateCategory];
}
