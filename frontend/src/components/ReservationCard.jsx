function ReservationCard({ reserva, alCancelar }) {
  return (
    <div className="card tarjeta-cine tarjeta-cine--compact mb-3">
      <div className="card-body tarjeta-cine__body">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <p className="tarjeta-cine__eyebrow mb-1">Reservation</p>
            <h5 className="tarjeta-cine__title tarjeta-cine__title--small mb-2">
              {reserva.date?.slice(0, 10)}
            </h5>
            <div className="reserva-meta">
              <span>{reserva.time}</span>
              <span>{reserva.people} people</span>
              <span>{reserva.area}</span>
            </div>
          </div>
          <span className="estado-cine estado-cine--ok">{reserva.status}</span>
        </div>

        {reserva.status !== "cancelled" && alCancelar && (
          <div className="mt-3">
            <button className="btn btn-cine-mini btn-cine-mini--danger" onClick={() => alCancelar(reserva._id)}>
              Cancelar reserva
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
