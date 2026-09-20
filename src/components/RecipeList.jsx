import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onEdit }) {
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
                />
        ))}
        </div>
    );
}

export default RecipeList