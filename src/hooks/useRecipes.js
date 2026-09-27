import { useEffect, useState } from 'react';
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from '../lib/api';

// Owns the recipe list and all data operations. Components use this hook
// instead of holding fetch logic themselves.
export function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setRecipes(await getRecipes());
    } catch (err) {
      setError(err.message);
    }
  }

  async function addRecipe(data) {
    try {
      const created = await createRecipe(data);
      setRecipes((current) => [...current, created]);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function saveRecipe(id, data) {
    try {
      const updated = await updateRecipe(id, data);
      setRecipes((current) => current.map((r) => (r.id === updated.id ? updated : r)));
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function removeRecipe(id) {
    try {
      await deleteRecipe(id);
      setRecipes((current) => current.filter((r) => r.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return { recipes, error, setError, addRecipe, saveRecipe, removeRecipe };
}
