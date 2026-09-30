export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-logo">
          <img
            src="/img/logo-void.png"
            alt="Logo Pastelería Mil Sabores"
            className="img-fluid"
            style={{ maxHeight: '180px' }}
          />
        </div>

        <div className="footer-content-direccion">
          <br />
          <h5>Nuestras Sucursales</h5>
          <ul>
            <li>
              <p>Enrique Olivares 4970, Santiago, La Florida</p>
            </li>
            <li>
              <p>Avenida Nueva Providencia 1953, Santiago, Providencia</p>
            </li>
          </ul>
        </div>

        <div className="footer-content-contacto">
          <h5>Contacto</h5>
          <p>
            <i className="bi bi-envelope" /> contacto@milsabores.com
          </p>
          <p>
            <i className="bi bi-telephone" /> +569 1234 5678
          </p>
          <p>
            <i className="bi bi-whatsapp" /> +569 1234 5678
          </p>
        </div>

        <div className="footer-content-siguenos">
          <h5>Siguenos</h5>
          <p>
            <i className="bi bi-instagram" /> MilSabores
          </p>
        </div>
      </div>

      <div className="footer-derechos text-center">
        <p>© 2026 Todos los derechos reservados</p>
      </div>
    </footer>
  )
}
