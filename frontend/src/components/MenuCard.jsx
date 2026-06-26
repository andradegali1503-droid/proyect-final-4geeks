function MenuCard({ plato, sePuedeEliminar, alEditar, alEliminar }) {
  return (
    <article className="menu-item-editorial">
      <div className="menu-item-editorial__media">
        {plato.image ? (
          <img className="menu-item-editorial__imagen" src={plato.image} alt={plato.name} />
        ) : (
          <div className="menu-item-editorial__vacio">MesaClick</div>
        )}
      </div>

      <div className="menu-item-editorial__contenido">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div className="flex-grow-1">
            <p className="menu-item-editorial__categoria mb-2">{plato.category}</p>
            <h3 className="menu-item-editorial__titulo mb-2">{plato.name}</h3>
            <p className="menu-item-editorial__texto mb-0">{plato.description}</p>
          </div>
          <strong className="menu-item-editorial__precio">{plato.price} EUR</strong>
        </div>

        <div className="menu-item-editorial__pie">
          <span className={`estado-cine ${plato.available ? "estado-cine--ok" : "estado-cine--off"}`}>
            {plato.available ? "Disponible" : "No disponible"}
          </span>

          {sePuedeEliminar && (
            <div className="menu-item-editorial__acciones">
              <button className="btn btn-cine-mini" type="button" onClick={() => alEditar(plato)}>
                Editar
              </button>
              <button
                className="btn btn-cine-mini btn-cine-mini--danger"
                type="button"
                onClick={() => alEliminar(plato._id)}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
