import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { useAuth } from "../context/AuthContext";
import { crearPlato, editarPlato, eliminarPlato, obtenerMenu } from "../services/menuService";

const seccionesMenu = [
  {
    clave: "Desayunos",
    titulo: "Desayunos",
    descripcion: "Opciones suaves y rápidas para empezar el día con calma."
  },
  {
    clave: "Entrantes",
    titulo: "Entrantes",
    descripcion: "Platos de apertura con sabor andaluz y presentación sencilla."
  },
  {
    clave: "Almuerzos",
    titulo: "Almuerzos",
    descripcion: "Platos completos para una comida principal con más presencia."
  },
  {
    clave: "Postres",
    titulo: "Postres",
    descripcion: "Un cierre dulce para redondear la experiencia."
  },
  {
    clave: "Bebidas",
    titulo: "Bebidas",
    descripcion: "Refrescos, vinos y bebidas para acompañar cada momento."
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

  const cargarMenu = async () => {
    try {
      const data = await obtenerMenu();
      setPlatos(data);
    } catch (error) {
      console.error("Error al cargar el menu:", error.response?.data || error.message);
      setMensajeError("No se pudo cargar el menu");
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
        setMensaje("Plato actualizado");
      } else {
        await crearPlato(datosEnviar);
        setMensaje("Plato creado");
      }

      limpiarFormulario();
      cargarMenu();
    } catch (error) {
      console.error("Error al guardar el plato:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo guardar el plato");
    }
  };

  const borrarPlato = async (idPlato) => {
    setMensaje("");
    setMensajeError("");

    try {
      await eliminarPlato(idPlato);
      setMensaje("Plato eliminado");
      cargarMenu();
    } catch (error) {
      console.error("Error al eliminar el plato:", error.response?.data || error.message);
      setMensajeError(error.response?.data?.message || "No se pudo eliminar el plato");
    }
  };

  if (cargando) {
    return <p>Cargando menu...</p>;
  }

  const platosPorSeccion = seccionesMenu
    .map((seccion) => ({
      ...seccion,
      platos: platos.filter((plato) => plato.category === seccion.clave)
    }))
    .filter((grupo) => grupo.platos.length > 0);

  return (
    <div className="menu-page">
      <section className="menu-portada tarjeta-cine">
        <div className="menu-portada__contenido">
          <p className="tarjeta-cine__eyebrow mb-2">Carta gastronómica</p>
          <h1 className="menu-portada__titulo">Menú</h1>
          <div className="menu-portada__linea" />
          <p className="menu-portada__texto">
            Una carta sencilla, elegante y separada por secciones para que el usuario encuentre rápido lo que
            quiere y el admin pueda editar cada plato sin complicaciones.
          </p>
          <div className="menu-portada__etiquetas">
            <span className="estado-cine estado-cine--ok">Secciones editables</span>
            <span className="estado-cine estado-cine--off">Estilo editorial</span>
          </div>
        </div>
      </section>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

      {esAdmin && (
        <section className="menu-editor-admin tarjeta-cine">
          <div className="menu-editor-admin__cabecera">
            <div>
              <p className="tarjeta-cine__eyebrow mb-1">Admin</p>
              <h2 className="menu-editor-admin__titulo mb-0">{idEditando ? "Editar plato" : "Crear plato"}</h2>
            </div>
            <p className="menu-editor-admin__texto mb-0">
              El formulario sigue simple, pero ahora encaja mejor con el nuevo menú por secciones.
            </p>
          </div>

          <form onSubmit={enviarFormulario} className="menu-editor-admin__form">
            <div className="menu-editor-admin__grid">
              <label className="campo-cine">
                <span>Nombre</span>
                <input
                  className="form-control"
                  name="name"
                  placeholder="Nombre del plato"
                  value={datosFormulario.name}
                  onChange={cambiarInput}
                />
              </label>

              <label className="campo-cine">
                <span>Sección</span>
                <select className="form-select" name="category" value={datosFormulario.category} onChange={cambiarInput}>
                  {seccionesMenu.map((seccion) => (
                    <option key={seccion.clave} value={seccion.clave}>
                      {seccion.titulo}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo-cine campo-cine--ancho">
                <span>Descripción</span>
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Descripcion corta y clara"
                  rows="3"
                  value={datosFormulario.description}
                  onChange={cambiarInput}
                />
              </label>

              <label className="campo-cine">
                <span>Precio</span>
                <input
                  className="form-control"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Precio"
                  value={datosFormulario.price}
                  onChange={cambiarInput}
                />
              </label>

              <label className="campo-cine">
                <span>Imagen</span>
                <input
                  className="form-control"
                  name="image"
                  placeholder="URL de la imagen"
                  value={datosFormulario.image}
                  onChange={cambiarInput}
                />
              </label>

              <label className="campo-cine campo-cine--check">
                <span>Estado</span>
                <div className="form-check menu-editor-admin__check">
                  <input
                    className="form-check-input"
                    id="available"
                    name="available"
                    type="checkbox"
                    checked={datosFormulario.available}
                    onChange={cambiarInput}
                  />
                  <label className="form-check-label" htmlFor="available">
                    Disponible
                  </label>
                </div>
              </label>
            </div>

            <div className="menu-editor-admin__acciones">
              <button className="btn btn-dark" type="submit">
                {idEditando ? "Guardar cambios" : "Crear plato"}
              </button>
              {idEditando && (
                <button className="btn btn-outline-secondary" type="button" onClick={limpiarFormulario}>
                  Cancelar edicion
                </button>
              )}
            </div>
          </form>
        </section>
      )}

      {platosPorSeccion.map((seccion) => (
        <section className="menu-seccion tarjeta-cine" key={seccion.clave}>
          <div className="menu-seccion__cabecera">
            <div>
              <p className="menu-seccion__eyebrow mb-2">{seccion.clave}</p>
              <h2 className="menu-seccion__titulo mb-2">{seccion.titulo}</h2>
              <p className="menu-seccion__descripcion mb-0">{seccion.descripcion}</p>
            </div>
            <span className="menu-seccion__contador">{seccion.platos.length} platos</span>
          </div>

          <div className="menu-lista">
            {seccion.platos.map((plato) => (
              <MenuCard
                key={plato._id}
                plato={plato}
                sePuedeEliminar={esAdmin}
                alEditar={cargarPlatoEnFormulario}
                alEliminar={borrarPlato}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Menu;
