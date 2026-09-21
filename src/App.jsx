import './App.css'
import { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import ErrorMessage from './components/ErrorMessage';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
  async function loadRecipes() {
    try {
      const response = await fetch("http://localhost:5148/api/recipes");
      if (!response.ok) {
        throw new Error("Kunde inte hämta recept");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError("Något gick fel. Kontrollera att servern är igång.");
    }
  }
  loadRecipes();
}, []);

  async function handleAddRecipe(newRecipe) {
  try {
    const response = await fetch("http://localhost:5148/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });
    if (!response.ok) {
      throw new Error("Kunde inte spara receptet");
    }
    const created = await response.json();
    setRecipes([...recipes, created]);
    setError(null);
  } catch (err) {
    setError(err.message);
  }
}

async function handleDeleteRecipe(id) {
  try {
    const response = await fetch(`http://localhost:5148/api/recipes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Kunde inte ta bort receptet");
    }
    setRecipes(recipes.filter(r => r.id !== id));
    setError(null);
  } catch (err) {
    setError(err.message);
  }
}

function handleEditClick(id) {
  setEditingRecipe(recipes.find(r => r.id == id));
}

async function handleUpdateRecipe(updatedRecipe) {
  try {
    const response = await fetch(`http://localhost:5148/api/recipes/${updatedRecipe.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRecipe),
    });
    if (!response.ok) {
      throw new Error("Kunde inte uppdatera receptet");
    }
    const updated = await response.json();
    setRecipes(recipes.map(r => r.id === updated.id ? updated : r));
    setEditingRecipe(null);
    setError(null);
  } catch (err) {
    setError(err.message);
  }
}

  return (
    <><h1>
      Receptbok
    </h1>
    <RecipeForm onAdd={handleAddRecipe} onUpdate={handleUpdateRecipe} editingRecipe={editingRecipe} />
    <RecipeList recipes={recipes} onEdit={handleEditClick} onDelete={handleDeleteRecipe} />
    <ErrorMessage message={error} />
    </>
  );
}

export default App
