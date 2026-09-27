import './App.css'
import { useState } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import ErrorMessage from './components/ErrorMessage';
import { useRecipes } from './hooks/useRecipes';

function App() {
  const { recipes, error, setError, addRecipe, saveRecipe, removeRecipe } = useRecipes();
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function handleAddRecipe(newRecipe) {
    const ok = await addRecipe(newRecipe);
    if (ok) setShowForm(false);
  }

  async function handleUpdateRecipe(updatedRecipe) {
    const ok = await saveRecipe(updatedRecipe.id, updatedRecipe);
    if (ok) setEditingRecipe(null);
  }

  function handleEditClick(id) {
    setEditingRecipe(recipes.find(r => r.id == id));
  }

  function openCreateForm() {
    setEditingRecipe(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingRecipe(null);
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
      <RecipeList recipes={recipes} onEdit={handleEditClick} onDelete={removeRecipe} />
    </>
  );
}

export default App
