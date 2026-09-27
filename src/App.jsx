import './App.css'
import { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import ErrorMessage from './components/ErrorMessage';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
    setShowForm(false);
    setError(null);
  } catch (err) {
    setError(err.message);
  }
}

function openCreateForm() {
  setEditingRecipe(null);
  setShowForm(true);
}

function closeForm() {
  setShowForm(false);
  setEditingRecipe(null);
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

  const formVisible = showForm || editingRecipe;

  return (
    <>
      <h1 className="app-title">Receptbok</h1>
      {formVisible ? (
        <RecipeForm
          onAdd={handleAddRecipe}
          onUpdate={handleUpdateRecipe}
          editingRecipe={editingRecipe}
          onError={setError}
          onCancel={closeForm}
        />
      ) : (
        <button className="create-btn" onClick={openCreateForm}>Skapa nytt recept</button>
      )}
      <ErrorMessage message={error} />
      <RecipeList recipes={recipes} onEdit={handleEditClick} onDelete={handleDeleteRecipe} />
    </>
  );
}

export default App
