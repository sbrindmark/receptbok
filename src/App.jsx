import './App.css'
import { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import ErrorMessage from './components/ErrorMessage';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <><h1>
      Receptbok
    </h1>
    <ErrorMessage message={error} />
    <RecipeForm onAdd={handleAddRecipe} />
    <RecipeList recipes={recipes} />
    </>
  );
}

export default App
