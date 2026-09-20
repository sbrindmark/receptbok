import { useState, useEffect } from "react";

function RecipeForm({ onAdd, editingRecipe }) {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
      if (editingRecipe) {
        setTitle(editingRecipe.title);
        setImage(editingRecipe.image);
        setDescription(editingRecipe.description);
      }
    },[editingRecipe]);

    function handleSubmit(e) {
        e.preventDefault();
        const newRecipe = {
        title: title,
        image: image,
        description: description,
    };
    onAdd(newRecipe);
    // rensa fälten:
    setTitle("");
    setImage("");
    setDescription("");
}

     return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titel" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bild-URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        />
        <textarea
        placeholder="Beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
      <button type="submit">Lägg till</button>
    </form>
  );
}

export default RecipeForm;