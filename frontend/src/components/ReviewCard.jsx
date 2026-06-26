function ReviewCard({ review, sePuedeEliminar, alEliminar }) {
  return (
    <div className="card tarjeta-cine tarjeta-cine--compact h-100">
      <div className="card-body tarjeta-cine__body">
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div>
            <p className="tarjeta-cine__eyebrow mb-1">Guest review</p>
            <strong className="tarjeta-cine__title tarjeta-cine__title--small">{review.user?.name || "Usuario"}</strong>
          </div>
          <span className="rating-cine">{review.rating}/5</span>
        </div>

        <p className="tarjeta-cine__text mb-0">{review.comment}</p>

        {sePuedeEliminar && (
          <div className="mt-3">
            <button className="btn btn-cine-mini btn-cine-mini--danger" onClick={() => alEliminar(review._id)}>
              Eliminar review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
