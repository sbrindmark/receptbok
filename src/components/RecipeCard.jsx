function RecipeCard({ title, image, description}) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <img src={image} alt={title} />
        </div>
    );
}

export default RecipeCard