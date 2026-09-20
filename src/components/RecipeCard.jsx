function RecipeCard({ id, title, image, description, onEdit}) {
    return (
        <div className="recipe-card">
            <h2>{title}</h2>
            <p>{description}</p>
            <img src={image} alt={title} />
            <button onClick={() => onEdit(id)}>Ändra</button>
        </div>
    );
}

export default RecipeCard