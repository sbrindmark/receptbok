import './App.css'
import { useState } from 'react';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';

function App() {

  const [recipes, setRecipes] = useState( [
    {id: 1, title: "Pannkakor", image: "https://www.recepten.se/bilder/recept/186/main/l/pannkakor.jpg", description: "Enkla och goda"},
    {id: 2, title: "Köttbullar", image: "https://images.arla.com/recordid/DABB690B-2F08-4D2B-8E47C383C5E1AC30/kottbullar.jpg?width=1200&height=630&mode=crop&format=jpg", description: "Runda"},
  ]);

  function handleAddRecipe(newRecipe) {
  setRecipes([...recipes, newRecipe]);
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
