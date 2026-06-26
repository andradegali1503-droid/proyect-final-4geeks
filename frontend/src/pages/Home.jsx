import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-cinema home-cinema--fullbleed">
      <section className="hero-cine hero-cine--fullbleed">
        <div className="hero-cine__overlay"></div>
        <div className="hero-cine__content hero-cine__content--wide">
          <div className="hero-cine__marca">
            <p className="hero-cine__eyebrow">Welcome to MesaClick</p>
            <h1 className="hero-cine__title">The Finest Place for Traditional Cuisine</h1>
            <p className="hero-cine__text">
              Una experiencia elegante para reservar mesa, consultar el menu y vivir un ambiente
              con sabor andaluz.
            </p>
          </div>

          <div className="hero-cine__actions">
            <Link className="btn btn-light btn-lg btn-cine-primary" to="/reservar">
              Book Table
            </Link>
            <Link className="btn btn-outline-light btn-lg btn-cine-secondary" to="/menu">
              View Menu
            </Link>
          </div>

          <div className="hero-cine__details">
            <span>Fine dining</span>
            <span>Andalucia inspired</span>
            <span>Reservations & reviews</span>
          </div>
        </div>
      </section>

      <section className="home-cinema__contenido row g-4 mt-4">
        <div className="col-md-4">
          <div className="info-cine">
            <span className="info-cine__number">01</span>
            <h2>Reserva rapida</h2>
            <p>Elige fecha, hora y area sin complicaciones.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="info-cine">
            <span className="info-cine__number">02</span>
            <h2>Menu cuidado</h2>
            <p>Platos andaluces, desayunos y bebidas con imagenes reales.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="info-cine">
            <span className="info-cine__number">03</span>
            <h2>Clima y email</h2>
            <p>Si eliges terraza, ves el clima y recibes confirmacion por correo.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
