import './App.css'
import { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import ErrorMessage from './components/ErrorMessage';
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from './lib/api';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
  async function loadRecipes() {
    try {
      setRecipes(await getRecipes());
    } catch (err) {
      setError(err.message);
    }
  }
  loadRecipes();
}, []);

  async function handleAddRecipe(newRecipe) {
  try {
    const created = await createRecipe(newRecipe);
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
    await deleteRecipe(id);
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
    const updated = await updateRecipe(updatedRecipe.id, updatedRecipe);
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
