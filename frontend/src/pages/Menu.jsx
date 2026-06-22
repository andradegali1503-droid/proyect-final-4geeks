import { useEffect, useState } from "react";
import MenuCard from "../components/MenuCard";
import { useAuth } from "../context/AuthContext";
import { crearPlato, editarPlato, eliminarPlato, obtenerMenu } from "../services/menuService";

function Menu() {
  const { esAdmin } = useAuth();
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [idEditando, setIdEditando] = useState("");
  const [datosFormulario, setDatosFormulario] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true
  });

  const categoriasOrdenadas = ["Desayunos", "Entrantes", "Almuerzos", "Postres", "Bebidas"];

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
    setDatosFormulario({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      available: true
    });
  };

  const cargarPlatoEnFormulario = (plato) => {
    setIdEditando(plato._id);
    setDatosFormulario({
      name: plato.name,
      description: plato.description,
      price: plato.price,
      category: plato.category,
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

  const platosPorCategoria = categoriasOrdenadas
    .map((categoria) => ({
      categoria,
      platos: platos.filter((plato) => plato.category === categoria)
    }))
    .filter((grupo) => grupo.platos.length > 0);

  return (
    <div>
      <h1 className="titulo-seccion">Menu del restaurante</h1>
      <p className="text-muted mb-4">
        Una seleccion inspirada en desayunos y platos tipicos de restaurantes de Andalucia.
      </p>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}

      {esAdmin && (
        <div className="card tarjeta-suave mb-4">
          <div className="card-body">
            <h2 className="h4 mb-3">{idEditando ? "Editar plato" : "Crear plato"}</h2>
            <form onSubmit={enviarFormulario}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input className="form-control" name="name" placeholder="Nombre" value={datosFormulario.name} onChange={cambiarInput} />
                </div>
                <div className="col-md-6">
                  <input className="form-control" name="category" placeholder="Categoria" value={datosFormulario.category} onChange={cambiarInput} />
                </div>
                <div className="col-12">
                  <input className="form-control" name="description" placeholder="Descripcion" value={datosFormulario.description} onChange={cambiarInput} />
                </div>
                <div className="col-md-6">
                  <input className="form-control" name="price" type="number" step="0.01" placeholder="Precio" value={datosFormulario.price} onChange={cambiarInput} />
                </div>
                <div className="col-md-6">
                  <input className="form-control" name="image" placeholder="URL imagen" value={datosFormulario.image} onChange={cambiarInput} />
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input className="form-check-input" id="available" name="available" type="checkbox" checked={datosFormulario.available} onChange={cambiarInput} />
                    <label className="form-check-label" htmlFor="available">
                      Disponible
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 mt-3">
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
          </div>
        </div>
      )}

      {platosPorCategoria.map((grupo) => (
        <section className="mb-5" key={grupo.categoria}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="h3 mb-0">{grupo.categoria}</h2>
            <span className="badge rounded-pill text-bg-light border">{grupo.platos.length} opciones</span>
          </div>

          <div className="row g-4">
            {grupo.platos.map((plato) => (
              <div className="col-md-6 col-lg-4" key={plato._id}>
                <MenuCard
                  plato={plato}
                  sePuedeEliminar={esAdmin}
                  alEditar={cargarPlatoEnFormulario}
                  alEliminar={borrarPlato}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default Menu;
