import { Sparkles, MapPin, Clock, Award, Compass } from "lucide-react";

function Footer() {
  return (
    <footer className="footer-cine border-top mt-5" style={{ borderColor: "rgba(200, 162, 106, 0.2) !important", background: "rgba(11, 10, 10, 0.95)" }}>
      <div className="container py-5">
        <div className="row g-4 text-start">
          <div className="col-lg-4 col-md-6">
            <h5 className="font-serif text-white mb-2" style={{ letterSpacing: "0.1em" }}>
              L'ATELIER NOIR
            </h5>
            <p className="text-white-50 small mb-3">
              Gastronomía de autor, devoción por el producto de origen y una hospitalidad cinco estrellas consagrada a la excelencia sensorial.
            </p>
            <div className="d-flex align-items-center gap-2 text-warning small">
              <Award size={16} /> Tres Estrellas Michelin • Relais & Châteaux Experience
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white-50 text-uppercase small mb-3" style={{ letterSpacing: "0.15em" }}>
              Horarios de Servicio
            </h6>
            <ul className="list-unstyled text-white-50 small mb-0" style={{ lineHeight: "1.9" }}>
              <li><strong>Déjeuner (Almuerzo):</strong> 13:00 — 16:30</li>
              <li><strong>Dîner (Cena):</strong> 20:00 — 23:30</li>
              <li className="text-muted">Lunes cerrado por descanso de sala</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white-50 text-uppercase small mb-3" style={{ letterSpacing: "0.15em" }}>
              Protocolo & Ubicación
            </h6>
            <ul className="list-unstyled text-white-50 small mb-0" style={{ lineHeight: "1.9" }}>
              <li>Paseo de la Castellana 42, Madrid</li>
              <li>Servicio exclusivo de Valet Parking</li>
              <li>Código de vestimenta: <em>Smart Elegant</em></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="text-white-50 text-uppercase small mb-3" style={{ letterSpacing: "0.15em" }}>
              Contacto Directo
            </h6>
            <p className="text-white-50 small mb-1">concierge@latelier-noir.com</p>
            <p className="text-white small fw-medium">+34 912 345 678</p>
          </div>
        </div>

        <div className="border-top pt-4 mt-4 d-flex justify-content-between align-items-center flex-wrap gap-2 text-white-50 small" style={{ borderColor: "rgba(255, 255, 255, 0.08) !important" }}>
          <div>© {new Date().getFullYear()} L'Atelier Noir. Todos los derechos reservados.</div>
          <div>Hospitalidad cinco estrellas • Privacidad y Protección de Datos Certificada</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
