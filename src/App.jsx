import './App.css'
import RecipeList from './components/RecipeList';

function App() {

  const recipes = [
    {id: 1, title: "Pannkakor", image: "https://www.recepten.se/bilder/recept/186/main/l/pannkakor.jpg", description: "Enkla och goda"},
    {id: 2, title: "Köttbullar", image: "https://images.arla.com/recordid/DABB690B-2F08-4D2B-8E47C383C5E1AC30/kottbullar.jpg?width=1200&height=630&mode=crop&format=jpg", description: "Runda"},
  ];

  return (
    <><h1>
      Receptbok
    </h1>
    <RecipeList recipes={recipes} />
    </>
  );
}

export default App
