import { useState, useEffect } from "react";

function RecipeForm({ onAdd, onUpdate, editingRecipe, onError }) {
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

    if (editingRecipe) {
      onUpdate({ ...newRecipe, id: editingRecipe.id});
    } else {
      onAdd(newRecipe);
    }

    setTitle("");
    setImage("");
    setDescription("");
}

async function handleFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try { 
  const response = await fetch("http://localhost:5148/api/recipes/upload", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Kunde inte ladda upp bilden");
  }
  const data = await response.json();
  setImage(data.url);
  } catch (err) {
  onError("Kunde inte ladda upp bilden. Kontrollera att servern är igång.");
  }
}

     return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titel" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
        <textarea
        placeholder="Beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <input
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        />
      <button type="submit">{editingRecipe ? "Spara" : "Lägg till"}</button>
    </form>
  );
}

export default RecipeForm;