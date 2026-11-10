import { Link } from "react-router-dom";
import { Sparkles, Award, UtensilsCrossed, Wine, CalendarCheck, ShieldCheck, ArrowRight, Star, Clock, MapPin } from "lucide-react";

function Home() {
  return (
    <div className="home-cinema home-cinema--fullbleed">
      {/* 1. SECCIÓN HERO EDITORIAL DE 5 ESTRELLAS */}
      <section className="hero-cine hero-cine--fullbleed position-relative text-center py-5">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, rgba(197, 160, 89, 0.18) 0%, rgba(12, 11, 10, 0.95) 75%, #0c0b0a 100%)",
            pointerEvents: "none"
          }}
        ></div>

        <div className="container position-relative z-1 py-5">
          <div className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-1 rounded-pill" style={{ background: "rgba(200, 162, 106, 0.1)", border: "1px solid rgba(200, 162, 106, 0.3)" }}>
            <Sparkles size={14} className="text-warning" />
            <span className="small text-warning text-uppercase fw-semibold" style={{ letterSpacing: "0.2em", fontSize: "0.72rem" }}>
              Tres Estrellas Michelin • Relais & Châteaux
            </span>
          </div>

          <h1
            className="font-serif fw-light text-white mb-3"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              letterSpacing: "0.04em",
              lineHeight: 1.05
            }}
          >
            L'Atelier Noir
          </h1>

          <p
            className="text-white-50 mx-auto mb-4"
            style={{
              maxWidth: "680px",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              lineHeight: 1.7,
              fontWeight: 300
            }}
          >
            Un santuario culinario donde la pureza del terruño y la técnica vanguardista se unen en una experiencia sensorial irrepetible.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
            <Link
              to="/reservar"
              className="btn btn-warning btn-lg px-4 py-3 text-dark fw-semibold d-inline-flex align-items-center gap-2"
              style={{ letterSpacing: "0.05em", borderRadius: "999px" }}
            >
              <CalendarCheck size={18} /> Reservar Experiencia
            </Link>
            <Link
              to="/menu"
              className="btn btn-outline-light btn-lg px-4 py-3 d-inline-flex align-items-center gap-2"
              style={{ letterSpacing: "0.05em", borderRadius: "999px", borderColor: "rgba(255, 255, 255, 0.25)" }}
            >
              <UtensilsCrossed size={18} /> Explorar la Carta
            </Link>
          </div>

          {/* Galardones y Acreditaciones */}
          <div
            className="d-flex justify-content-center align-items-center gap-4 gap-md-5 text-white-50 small flex-wrap pt-4 border-top"
            style={{ borderColor: "rgba(200, 162, 106, 0.2)" }}
          >
            <div className="d-flex align-items-center gap-2">
              <Star size={15} className="text-warning" fill="#c5a059" />
              <span>3 Estrellas Michelin (2024–2026)</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Award size={15} className="text-warning" />
              <span>The World's 50 Best Restaurants</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Wine size={15} className="text-warning" />
              <span>Cava de 1.400+ Referencias</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <ShieldCheck size={15} className="text-warning" />
              <span>Protocolo de Alergias & VIP Concierge</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOS TRES PILARES DE LA HOSPITALIDAD */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="text-warning text-uppercase small d-block mb-1" style={{ letterSpacing: "0.22em" }}>
            Filosofía & Liturgia
          </span>
          <h2 className="font-serif text-white display-6">Los Tres Pilares de L'Atelier</h2>
          <div className="mx-auto" style={{ width: "60px", height: "1px", background: "#c5a059" }}></div>
        </div>

        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="card tarjeta-suave p-4 p-lg-5 h-100">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-4 rounded-circle"
                style={{ width: "48px", height: "48px", background: "rgba(200, 162, 106, 0.15)", color: "#c5a059" }}
              >
                <UtensilsCrossed size={22} />
              </div>
              <span className="text-warning small text-uppercase fw-bold mb-2 d-block" style={{ letterSpacing: "0.15em" }}>
                01 • Producto de Terroir
              </span>
              <h3 className="font-serif text-white h4 mb-3">Vanguardia Culinaria</h3>
              <p className="text-white-50 small mb-0" style={{ lineHeight: "1.8" }}>
                Ingredientes autóctonos recolectados diariamente por maestros artesanos. Cada plato expresa la verdad del paisaje, el clima y las estaciones en su estado más puro.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card tarjeta-suave p-4 p-lg-5 h-100">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-4 rounded-circle"
                style={{ width: "48px", height: "48px", background: "rgba(200, 162, 106, 0.15)", color: "#c5a059" }}
              >
                <Wine size={22} />
              </div>
              <span className="text-warning small text-uppercase fw-bold mb-2 d-block" style={{ letterSpacing: "0.15em" }}>
                02 • Cava & Sommelier
              </span>
              <h3 className="font-serif text-white h4 mb-3">Armonías de Colección</h3>
              <p className="text-white-50 small mb-0" style={{ lineHeight: "1.8" }}>
                Una biblioteca viva de añadas históricas, pequeños viticultores biodinámicos y joyas enológicas privadas seleccionadas minuciosamente para cada pase del menú.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="card tarjeta-suave p-4 p-lg-5 h-100">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-4 rounded-circle"
                style={{ width: "48px", height: "48px", background: "rgba(200, 162, 106, 0.15)", color: "#c5a059" }}
              >
                <Sparkles size={22} />
              </div>
              <span className="text-warning small text-uppercase fw-bold mb-2 d-block" style={{ letterSpacing: "0.15em" }}>
                03 • Servicio 5 Estrellas
              </span>
              <h3 className="font-serif text-white h4 mb-3">Hospitalidad Silenciosa</h3>
              <p className="text-white-50 small mb-0" style={{ lineHeight: "1.8" }}>
                Un servicio que anticipa el deseo sin hacerse notar. Cuidado minucioso de alérgenos, asignación preferente de mesa y protocolo de discreción para cada huésped.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCIAS SIGNATURE */}
      <section className="container py-5">
        <div className="card tarjeta-suave p-4 p-md-5 position-relative overflow-hidden" style={{ border: "1px solid rgba(200, 162, 106, 0.35)" }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge-atelier-gold mb-3">Menú Degustación Signature</span>
              <h2 className="font-serif text-white display-6 mb-3">
                Grand Menu Dégustation • 10 Pases
              </h2>
              <p className="text-white-50 mb-4" style={{ lineHeight: "1.8" }}>
                Un recorrido de diez estaciones diseñado por el Chef Ejecutivo: mariscos de lonja profunda, aves de corral de casta antigua, trufa negra y fondos cocinados durante 48 horas a fuego suave.
              </p>
              <div className="d-flex align-items-center gap-4 flex-wrap">
                <div>
                  <span className="text-white-50 small d-block">Inversión gastronómica</span>
                  <span className="text-warning fs-4 fw-bold font-monospace">195 €</span>
                  <span className="text-white-50 small"> / comensal</span>
                </div>
                <div>
                  <span className="text-white-50 small d-block">Maridaje Sommelier</span>
                  <span className="text-white fs-5 fw-medium font-monospace">+95 €</span>
                </div>
                <Link to="/reservar" className="btn btn-warning fw-semibold text-dark px-4 py-2 rounded-pill ms-auto">
                  Asegurar Mesa <ArrowRight size={16} className="ms-1" />
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div
                className="p-4 rounded-4"
                style={{
                  background: "rgba(10, 9, 8, 0.75)",
                  border: "1px solid rgba(200, 162, 106, 0.25)"
                }}
              >
                <h5 className="font-serif text-warning mb-3">Citas de Mesa Disponibles</h5>
                <ul className="list-unstyled text-white-50 small mb-0" style={{ lineHeight: "2" }}>
                  <li className="d-flex justify-content-between">
                    <span>Le Grand Salon (Salón Principal)</span>
                    <strong className="text-white">Almuerzo & Cena</strong>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>L'Orangerie (Terraza Climatizada)</span>
                    <strong className="text-white">Servicio de Noche</strong>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Chef's Table Privée (Frente a cocina)</span>
                    <strong className="text-warning">1 Turno Exclusivo</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CITA DE CRÍTICA GASTRONÓMICA */}
      <section className="container py-5 text-center">
        <div className="mx-auto" style={{ maxWidth: "760px" }}>
          <span className="text-warning fs-1 font-serif d-block mb-2">«</span>
          <p className="font-serif text-white fs-4 fst-italic mb-3" style={{ lineHeight: "1.6" }}>
            Una auténtica liturgia culinaria donde la técnica vanguardista no disfraza la pureza del terruño, sino que la eleva a la categoría de emoción perdurable.
          </p>
          <div className="text-warning small text-uppercase fw-semibold" style={{ letterSpacing: "0.2em" }}>
            Guía Michelin • Inspección de Honor
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
