# Receptbok - Frontend

En receptbok byggd i React där man kan skapa nya recept, ändrar och tar bort dem.

## Teknik
- React (Vite)
- Node.js
- Backend måste vara igång (se backend-repot). Frontend förväntar sig API:t på `http://localhost:5148`.


## Komma igång
```bash
git clone https://github.com/sbrindmark/receptbok.git
cd receptbok
npm install
npm run dev
```

## Funktioner
- Lista, skapa, uppdatera och ta bort recept via API:et
- Ladda upp och visa en bild per recept
- Responsiv design (desktop och mobil)
- Felmeddelande visas om ett API-anrop misslyckas

## Tekniska val
- **Komponentbaserad struktur:** UI:t är uppdelat i återanvändbara komponenter (`RecipeList`, `RecipeCard`, `RecipeForm`, `ErrorMessage`) med tydligt dataflöde – data skickas nedåt som props, händelser skickas uppåt via callbacks.
- **Frikopplad frontend:** appen känner bara till API:t via HTTP (`fetch`), inte hur datan lagras. Backend kan ändras utan att frontend rörs.
- **Felhantering:** alla API-anrop kontrollerar `response.ok` och fångas i `try/catch`. Fel visas i en gemensam `ErrorMessage`-komponent i stället för att appen kraschar.
- **Responsivitet:** CSS Grid + media query ger flera kolumner på desktop och en kolumn på mobil.
- **Bilduppladdning:** filer skickas som `multipart/form-data` via `FormData` till API:t, som returnerar en URL som sparas på receptet.

