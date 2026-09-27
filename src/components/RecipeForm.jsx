import { useState, useEffect } from "react";
import { uploadImage } from "../lib/api";

function RecipeForm({ onAdd, onUpdate, editingRecipe, onError, onCancel }) {
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
  try {
    const url = await uploadImage(file);
    setImage(url);
  } catch (err) {
    onError(err.message);
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
      <button type="button" onClick={onCancel}>Avbryt</button>
    </form>
  );
}

export default RecipeForm;