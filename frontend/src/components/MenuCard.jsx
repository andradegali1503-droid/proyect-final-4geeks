function MenuCard({ plato, sePuedeEliminar, alEditar, alEliminar }) {
  return (
    <div className="card tarjeta-suave h-100 overflow-hidden">
      <div className="contenedor-imagen-plato">
        {plato.image ? (
          <img className="imagen-plato" src={plato.image} alt={plato.name} />
        ) : (
          <div className="imagen-plato imagen-plato-vacia">MesaClick</div>
        )}
      </div>
      <div className="card-body">
        <span className="badge text-bg-dark mb-3">{plato.category}</span>
        <h5 className="card-title">{plato.name}</h5>
        <p className="card-text text-muted">{plato.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <strong>{plato.price} EUR</strong>
          <span className={`badge ${plato.available ? "text-bg-success" : "text-bg-secondary"}`}>
            {plato.available ? "Disponible" : "No disponible"}
          </span>
        </div>

        {sePuedeEliminar && (
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-dark btn-sm" onClick={() => alEditar(plato)}>
              Editar
            </button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => alEliminar(plato._id)}>
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuCard;
