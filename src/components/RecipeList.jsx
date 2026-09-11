import RecipeCard from "./RecipeCard";

function RecipeList({ recipes }) {
    return (
        <div className="recipe-list">
        {recipes.map((recipe) => (
            <RecipeCard
                title={recipe.title}
                key={recipe.id}
                description={recipe.description}
                image={recipe.image}
                />
        ))}
        </div>
    );
}

export default RecipeList