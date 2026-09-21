import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onEdit, onDelete }) {
    return (
        <div className="recipe-list">
        {recipes.map((recipe) => (
            <RecipeCard
                title={recipe.title}
                key={recipe.id}
                id={recipe.id}
                description={recipe.description}
                image={recipe.image}
                onEdit={onEdit}
                onDelete={onDelete}
                />
        ))}
        </div>
    );
}

export default RecipeList