import './App.css'
import { useState, useEffect } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';

function App() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function loadRecipes() {
      const response = await fetch("http://localhost:5148/api/recipes");
      const data = await response.json();
      setRecipes(data);
    }
    loadRecipes();
  }, []);

  async function handleAddRecipe(newRecipe) {
    const response = await fetch("http://localhost:5148/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    });
    const created = await response.json();
    setRecipes([...recipes, created]);
}

  return (
    <><h1>
      Receptbok
    </h1>
    <RecipeForm onAdd={handleAddRecipe} />
    <RecipeList recipes={recipes} />
    </>
  );
}

export default App
