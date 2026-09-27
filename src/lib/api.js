const API_URL = 'http://localhost:5148';

// Central fetch helper: builds the request, handles errors and empty body.
// All endpoint functions below go through this.
async function request(path, options = {}) {
  const { method = 'GET', body } = options;
  const headers = {};
  let payload;

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, { method, headers, body: payload });
  } catch {
    // fetch only throws when the server can't be reached at all
    throw new Error('Kunde inte nå servern. Kontrollera att servern är igång.');
  }

  if (!response.ok) {
    throw new Error('Något gick fel i anropet.');
  }

  // DELETE responds with 204 (no body) - response.json() would throw
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Endpoint functions - components/hooks call these instead of using fetch directly
export const getRecipes = () => request('/api/recipes');
export const createRecipe = (data) => request('/api/recipes', { method: 'POST', body: data });
export const updateRecipe = (id, data) => request(`/api/recipes/${id}`, { method: 'PUT', body: data });
export const deleteRecipe = (id) => request(`/api/recipes/${id}`, { method: 'DELETE' });

// Image upload uses multipart/form-data - no JSON, and Content-Type must NOT
// be set manually (the browser adds the boundary itself).
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  let response;
  try {
    response = await fetch(`${API_URL}/api/recipes/upload`, { method: 'POST', body: formData });
  } catch {
    throw new Error('Kunde inte ladda upp bilden. Kontrollera att servern är igång.');
  }

  if (!response.ok) {
    throw new Error('Kunde inte ladda upp bilden');
  }

  const data = await response.json();
  return data.url;
}
