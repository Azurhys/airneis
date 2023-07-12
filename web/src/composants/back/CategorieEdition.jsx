import React, { useState } from 'react';

function CategorieEdition({ categories, updateCategory }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState({});
  
  const handleEdit = (category) => {
    setEditingCategory(category.id);
    setUpdatedCategory(category);
  };

  const handleUpdate = () => {
    updateCategory(editingCategory, updatedCategory);
    setEditingCategory(null);
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          {editingCategory === category.id ? (
            <div>
              <input
                type="text"
                value={updatedCategory.name}
                onChange={(e) => setUpdatedCategory(prevCategory => ({ ...prevCategory, name: e.target.value }))}
              />
              <input
                type="text"
                value={updatedCategory.image}
                onChange={(e) => setUpdatedCategory(prevCategory => ({ ...prevCategory, image: e.target.value }))}
              />
              <button onClick={handleUpdate}>Mettre à jour</button>
            </div>
          ) : (
            <div>
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
              <button onClick={() => handleEdit(category)}>Éditer</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CategorieEdition;
