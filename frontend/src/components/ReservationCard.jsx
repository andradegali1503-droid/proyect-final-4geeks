function ReservationCard({ reserva, alCancelar }) {
  return (
    <div className="card tarjeta-suave mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="mb-1">{reserva.date?.slice(0, 10)}</h5>
            <p className="mb-1">Hora: {reserva.time}</p>
            <p className="mb-1">Personas: {reserva.people}</p>
            <p className="mb-0">Area: {reserva.area}</p>
          </div>
          <span className="badge text-bg-dark">{reserva.status}</span>
        </div>

        {reserva.status !== "cancelled" && alCancelar && (
          <button className="btn btn-outline-danger btn-sm mt-3" onClick={() => alCancelar(reserva._id)}>
            Cancelar reserva
          </button>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
