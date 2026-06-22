function ReviewCard({ review, sePuedeEliminar, alEliminar }) {
  return (
    <div className="card tarjeta-suave h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between mb-2">
          <strong>{review.user?.name || "Usuario"}</strong>
          <span className="badge text-bg-warning">{review.rating}/5</span>
        </div>
        <p className="text-muted mb-0">{review.comment}</p>

        {sePuedeEliminar && (
          <button className="btn btn-outline-danger btn-sm mt-3" onClick={() => alEliminar(review._id)}>
            Eliminar review
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
