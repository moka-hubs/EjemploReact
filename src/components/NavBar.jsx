import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import { categorias } from '../data/productos.js'
import { useCarrito } from '../context/CarritoContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useModales } from '../context/ModalesContext.jsx'

export default function NavBar() {
  const { cantidadTotal, abrirCarrito } = useCarrito()
  const { estaLogueado, usuarioActual, cerrarSesion } = useAuth()
  const { abrirLogin } = useModales()
  const [params] = useSearchParams()
  const navegar = useNavigate()
  const categoriaActiva = params.get('categoria')

  function irACategoria(categoria) {
    const destino = categoria === 'Todos Los Productos' ? '/catalogo' : `/catalogo?categoria=${encodeURIComponent(categoria)}`
    navegar(destino)
  }

  return (
    <header className="header sticky-top">
      <Navbar expand="lg" bg="body-tertiary" variant="light">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            <img src="/img/logo.png" alt="Logo Pastelería Mil Sabores" className="img-fluid" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-principal" />
          <Navbar.Collapse id="navbar-principal">
            <Nav className="me-auto mb-2 mb-lg-0">
              <li className="nav-home">
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </li>
              <Nav.Item>
                <NavLink className="nav-link" to="/nosotros">
                  Sobre Nosotros
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <Dropdown>
                  <Dropdown.Toggle className="nav-link" id="dropdown-productos">
                    Nuestros Productos
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categorias.map((categoria) => (
                      <Dropdown.Item
                        key={categoria}
                        active={categoriaActiva === categoria}
                        onClick={() => irACategoria(categoria)}
                      >
                        {categoria}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </Nav.Item>
            </Nav>

            <button
              type="button"
              className="carrito btn-nav position-relative"
              onClick={abrirCarrito}
              aria-label="Abrir carrito"
            >
              <i className="bi bi-cart" />
              {cantidadTotal > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cantidadTotal}
                </span>
              )}
            </button>

            {estaLogueado ? (
              <div className="d-flex align-items-center gap-2">
                <span className="nav-link mb-0">
                  <i className="bi bi-person-check" /> {usuarioActual.nombre}
                </span>
                <button type="button" className="btn-nav" onClick={cerrarSesion} aria-label="Cerrar sesión">
                  <i className="bi bi-box-arrow-right" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn-nav"
                onClick={abrirLogin}
                aria-label="Iniciar sesión"
              >
                <i className="bi bi-person" />
              </button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
