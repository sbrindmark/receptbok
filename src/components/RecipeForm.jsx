import { useState } from "react";

function RecipeForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const newRecipe = {
        id: Date.now(),
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