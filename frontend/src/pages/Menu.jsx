import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import { useAuth } from "../context/AuthContext";
import { crearPlato, editarPlato, eliminarPlato, obtenerMenu } from "../services/menuService";
import { Sparkles, Utensils, Wine, Plus, RefreshCw, CalendarCheck, CheckCircle2, AlertTriangle } from "lucide-react";

const seccionesMenu = [
  {
    clave: "Entrantes",
    titulo: "Entrées de Saison & Terroir",
    descripcion: "Pases de apertura consagrados al marisco de lonja, tubérculos y caldos de cocción lenta."
  },
  {
    clave: "Almuerzos",
    titulo: "Plats Principaux & Haute Cuisine",
    descripcion: "Pescados salvajes a la brasa de sarmiento y carnes nobles maduradas con fondos clásicos."
  },
  {
    clave: "Postres",
    titulo: "Haute Pâtisserie & Cierre Dulce",
    descripcion: "Creaciones de autor con chocolate de origen puro, cítricos y contrastes de texturas."
  },
  {
    clave: "Bebidas",
    titulo: "Cava Privada, Añadas & Vinos de Autor",
    descripcion: "Selección del Maestro Summelier: champagnes de pequeños viticultores y añadas históricas."
  },
  {
    clave: "Desayunos",
    titulo: "Petit Déjeuner & Degustación Matinal",
    descripcion: "Selección matinal de panadería artesanal de masa madre y aceites monovarietales."
  }
];

const formularioInicial = {
  name: "",
  description: "",
  price: "",
  category: "Entrantes",
  image: "",
  available: true
};

function Menu() {
  const { esAdmin } = useAuth();
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [idEditando, setIdEditando] = useState("");
  const [datosFormulario, setDatosFormulario] = useState(formularioInicial);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("todos");

  const cargarMenu = async () => {
    try {
      const data = await obtenerMenu();
      setPlatos(data || []);
    } catch (error) {
      console.error("Error al cargar el menu:", error.response?.data || error.message);
      setMensajeError("No se pudo cargar la carta gastronómica");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarMenu();
  }, []);

  const cambiarInput = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosFormulario({
      ...datosFormulario,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const limpiarFormulario = () => {
    setIdEditando("");
    setDatosFormulario(formularioInicial);
  };

  const abrirModalNuevo = () => {
    limpiarFormulario();
    setMensaje("");
    setMensajeError("");
    setMostrarModal(true);
  };

  const cargarPlatoEnFormulario = (plato) => {
    setIdEditando(plato._id);
    setDatosFormulario({
      name: plato.name,
      description: plato.description,
      price: plato.price,
      category: plato.category || "Entrantes",
      image: plato.image || "",
      available: plato.available
    });
    setMensaje("");
    setMensajeError("");
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    limpiarFormulario();
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    setMensaje("");
    setMensajeError("");

    const datosEnviar = {
      ...datosFormulario,
      price: Number(datosFormulario.price)
    };

    try {
      if (idEditando) {
        await editarPlato(idEditando, datosEnviar);
        setMensaje("Creación gastronómica actualizada");
      } else {
        await crearPlato(datosEnviar);
        setMensaje("Nueva creación incorporada a la carta");
      }

      cerrarModal();
      cargarMenu();
    } catch (error) {
      console.error("Error al guardar el plato:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo actualizar la carta");
    }
  };

  const borrarPlato = async (idPlato) => {
    const confirmar = window.confirm("¿Seguro que desea retirar este plato de la carta?");
    if (!confirmar) return;

    setMensaje("");
    setMensajeError("");

    try {
      await eliminarPlato(idPlato);
      setMensaje("Plato retirado de la carta");
      cargarMenu();
    } catch (error) {
      console.error("Error al eliminar el plato:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo retirar el plato");
    }
  };

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning mb-3" role="status"></div>
        <p className="text-white-50">Abriendo la Carta Gastronómica de L'Atelier Noir...</p>
      </div>
    );
  }

  const seccionesFiltradas = seccionesMenu
    .filter((sec) => filtroCategoria === "todos" || sec.clave === filtroCategoria)
    .map((seccion) => ({
      ...seccion,
      platos: platos.filter((plato) => plato.category === seccion.clave)
    }))
    .filter((grupo) => grupo.platos.length > 0 || filtroCategoria === grupo.clave);

  return (
    <div className="container py-4">
      {/* Encabezado Editorial de Alta Cocina */}
      <div className="text-center mb-5">
        <div className="d-inline-flex align-items-center gap-2 mb-2">
          <span className="badge-atelier-gold">
            <Sparkles size={13} className="text-warning" /> Alta Gastronomía de Temporada
          </span>
        </div>
        <h1 className="display-5 text-white fw-light font-serif mb-2" style={{ letterSpacing: "0.03em" }}>
          La Carta & Bodega
        </h1>
        <p className="text-white-50 mx-auto" style={{ maxWidth: "620px", fontSize: "0.95rem" }}>
          Una sinfonía de técnicas culinarias contemporáneas y devoción absoluta por el producto silvestre, de granja ética y de terruños centenarios.
        </p>

        {/* Filtros de Categoría */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
          <button
            className={`shift-pill ${filtroCategoria === "todos" ? "shift-pill--active" : ""}`}
            onClick={() => setFiltroCategoria("todos")}
          >
            Toda la Carta
          </button>
          {seccionesMenu.map((sec) => (
            <button
              key={sec.clave}
              className={`shift-pill ${filtroCategoria === sec.clave ? "shift-pill--active" : ""}`}
              onClick={() => setFiltroCategoria(sec.clave)}
            >
              {sec.clave}
            </button>
          ))}
        </div>
      </div>

      {mensaje && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4 border-0 text-white" style={{ background: "rgba(46, 125, 50, 0.25)", border: "1px solid rgba(76, 175, 80, 0.4)" }}>
          <CheckCircle2 size={16} className="text-success" />
          <span>{mensaje}</span>
        </div>
      )}
      {mensajeError && (
        <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 border-0 text-white" style={{ background: "rgba(198, 40, 40, 0.25)", border: "1px solid rgba(239, 83, 80, 0.4)" }}>
          <AlertTriangle size={16} className="text-danger" />
          <span>{mensajeError}</span>
        </div>
      )}

      {/* Barra de Gestión de Carta para Administrador */}
      {esAdmin && (
        <div className="card tarjeta-suave p-3 mb-5 border-warning d-flex flex-row justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="badge-atelier-gold">Admin de Cocina</span>
            <span className="text-white small">Gestión de pases y disponibilidad de carta</span>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-warning text-dark fw-medium d-flex align-items-center gap-1" onClick={abrirModalNuevo}>
              <Plus size={14} /> Añadir Creación
            </button>
            <button className="btn btn-sm btn-outline-light d-flex align-items-center gap-1" onClick={cargarMenu}>
              <RefreshCw size={14} /> Actualizar
            </button>
          </div>
        </div>
      )}

      {/* Listado de Platos por Sección Editorial */}
      {seccionesFiltradas.length === 0 ? (
        <div className="card tarjeta-suave text-center py-5">
          <Utensils size={36} className="text-warning mx-auto mb-2 opacity-50" />
          <p className="text-white-50">No hay creaciones registradas en esta categoría actualmente.</p>
        </div>
      ) : (
        seccionesFiltradas.map((seccion) => (
          <section key={seccion.clave} className="mb-5">
            <div className="border-bottom pb-2 mb-4" style={{ borderColor: "rgba(200, 162, 106, 0.2) !important" }}>
              <span className="text-warning small text-uppercase fw-bold" style={{ letterSpacing: "0.15em", fontSize: "0.72rem" }}>
                Pase Culinario
              </span>
              <h2 className="font-serif text-white h3 mb-1">{seccion.titulo}</h2>
              <p className="text-white-50 small mb-0">{seccion.descripcion}</p>
            </div>

            <div className="row g-4">
              {seccion.platos.length === 0 ? (
                <div className="col-12 text-white-50 small py-3">
                  Sin creaciones activas en este pase.
                </div>
              ) : (
                seccion.platos.map((plato) => (
                  <div key={plato._id} className="col-md-6 col-lg-4">
                    <MenuCard
                      plato={plato}
                      sePuedeEliminar={esAdmin}
                      alEditar={cargarPlatoEnFormulario}
                      alEliminar={borrarPlato}
                    />
                  </div>
                ))
              )}
            </div>
          </section>
        ))
      )}

      {/* Banner de Llamada a la Reserva */}
      <div className="card tarjeta-suave text-center p-5 mt-5 border-warning">
        <h3 className="font-serif text-white mb-2">Viva la Experiencia Completa en Sala</h3>
        <p className="text-white-50 small mx-auto mb-4" style={{ maxWidth: "520px" }}>
          Nuestros menús degustación se confeccionan exclusivamente bajo reserva con maridaje armonizado por nuestra sumillería.
        </p>
        <div>
          <Link className="btn btn-warning fw-medium text-dark px-4 py-2 d-inline-flex align-items-center gap-2" to="/reservar">
            <CalendarCheck size={16} /> Reservar Experiencia de Alta Cocina
          </Link>
        </div>
      </div>

      {/* Modal de Creación / Edición para Admin */}
      {mostrarModal && esAdmin && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-3 px-3"
          style={{ background: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(6px)" }}
        >
          <div className="card tarjeta-suave w-100" style={{ maxWidth: "560px", border: "1px solid #c5a059" }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-white font-serif mb-0">
                  {idEditando ? "Editar Creación Culinaria" : "Nueva Creación en Carta"}
                </h4>
                <button className="btn btn-sm btn-outline-light" onClick={cerrarModal}>
                  ✕
                </button>
              </div>

              <form onSubmit={enviarFormulario}>
                <div className="mb-3">
                  <label className="form-label text-white-50 small">Nombre del Plato</label>
                  <input
                    className="form-control bg-dark text-white border-secondary"
                    name="name"
                    value={datosFormulario.name}
                    onChange={cambiarInput}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label text-white-50 small">Pase / Categoría</label>
                    <select
                      className="form-select bg-dark text-white border-secondary"
                      name="category"
                      value={datosFormulario.category}
                      onChange={cambiarInput}
                    >
                      {seccionesMenu.map((sec) => (
                        <option key={sec.clave} value={sec.clave}>
                          {sec.clave} ({sec.titulo.split("&")[0]})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label text-white-50 small">Precio (€)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control bg-dark text-white border-secondary"
                      name="price"
                      value={datosFormulario.price}
                      onChange={cambiarInput}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-white-50 small">Descripción Sensorial & Ingredientes</label>
                  <textarea
                    className="form-control bg-dark text-white border-secondary"
                    rows="3"
                    name="description"
                    value={datosFormulario.description}
                    onChange={cambiarInput}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-white-50 small">URL Fotografía en Alta Resolución</label>
                  <input
                    type="url"
                    className="form-control bg-dark text-white border-secondary"
                    name="image"
                    value={datosFormulario.image}
                    onChange={cambiarInput}
                  />
                </div>

                <div className="form-check form-switch mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="disponibleCheck"
                    name="available"
                    checked={datosFormulario.available}
                    onChange={cambiarInput}
                  />
                  <label className="form-check-label text-white-50 small" htmlFor="disponibleCheck">
                    Plato disponible en el servicio actual
                  </label>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-warning fw-medium text-dark w-100" type="submit">
                    Guardar Plato
                  </button>
                  <button className="btn btn-outline-secondary text-white w-100" type="button" onClick={cerrarModal}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
