function RecipeCard({ id, title, image, description, onEdit, onDelete }) {
    return (
        <div className="recipe-card">
            {image
                ? <img className="recipe-card-image" src={image} alt={title} />
                : <div className="recipe-card-image recipe-card-placeholder">🍽</div>}
            <div className="recipe-card-body">
                <h2 className="recipe-card-title">{title}</h2>
                <p className="recipe-card-desc">{description}</p>
                <div className="recipe-card-actions">
                    <button className="btn btn-edit" onClick={() => onEdit(id)}>Ändra</button>
                    <button className="btn btn-delete" onClick={() => onDelete(id)}>Ta bort</button>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard
