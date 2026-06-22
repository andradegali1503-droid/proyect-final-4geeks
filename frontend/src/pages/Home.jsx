import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="row g-4 align-items-center">
      <div className="col-lg-7">
        <section className="hero-mesa">
          <p className="text-uppercase small mb-2">Reserva facil para tu restaurante</p>
          <h1 className="display-4 fw-bold">MesaClick organiza tus reservas sin llamadas ni caos</h1>
          <p className="lead mt-3">
            Tus clientes pueden registrarse, reservar mesa, revisar el menu y dejar opiniones
            desde una sola app.
          </p>
          <div className="d-flex gap-3 mt-4 flex-wrap">
            <Link className="btn btn-light btn-lg" to="/reservar">
              Reservar mesa
            </Link>
            <Link className="btn btn-outline-light btn-lg" to="/menu">
              Ver menu
            </Link>
          </div>
        </section>
      </div>

      <div className="col-lg-5">
        <div className="card tarjeta-suave">
          <div className="card-body p-4">
            <h2 className="titulo-seccion">Lo que puedes hacer</h2>
            <ul className="mb-0">
              <li>Crear tu cuenta e iniciar sesion</li>
              <li>Reservar en interior o terraza</li>
              <li>Ver y cancelar tus reservas</li>
              <li>Consultar el menu del restaurante</li>
              <li>Dejar reviews con calificacion</li>
              <li>Administrar reservas y platos si eres admin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
