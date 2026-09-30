import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useModales } from '../context/ModalesContext.jsx'

export default function Home() {
  const { abrirLogin, abrirRegistro } = useModales()

  return (
    <section className="hero">
      <div className="container seccion-hero">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src="/img/logo.png"
              alt="Logo Pastelería Mil Sabores"
              className="img-fluid my-4"
              style={{ maxHeight: '500px' }}
            />
          </div>
          <div className="col-md-6">
            <h1>Pastelería Mil Sabores</h1>
            <p>
              Pastelería 1000 Sabores celebra su 50 aniversario como un referente en la repostería
              chilena. Famosa por su participación en un récord Guinness en 1995, cuando colaboró
              en la creación de la torta más grande del mundo, la pastelería busca renovar su
              sistema de ventas online para ofrecer una experiencia de compra moderna y accesible
              para sus clientes.
            </p>

            <Link to="/catalogo" className="btn btn-hero">
              Ver catalogo
            </Link>
            <Link className="btn btn-hero" to="/nosotros">
              Sobre nosotros
            </Link>
          </div>
        </div>
      </div>

      <section className="ofertas">
        <Container>
          <div className="card-oferta row">
            <div className="text-center">
              <h3>
                Si estas registrado en Pasteleria Mil Sabores puedes acceder a estos excelentes
                descuentos en tu compra
              </h3>
              <ul>
                <p> Si eres mayor a 50 años obtendras un 50% de descuento en el total de tu compra</p>
              </ul>
              <ul>
                <p>
                  Si al momento de registrarse ocupas el codigo FELICES50 obtendras un 10% de
                  descuento de por vida
                </p>
              </ul>
              <ul>
                <p>
                  Para cada estudiante de Duoc Uc que se registre con su correo institucional
                  obtendra una torta gratis por su cumpleaños
                </p>
              </ul>

              <button type="button" className="btn-oferta" onClick={abrirLogin}>
                Inicia Sesión
              </button>

              <button type="button" className="btn-oferta" onClick={abrirRegistro}>
                Registrarse
              </button>
            </div>
          </div>
        </Container>
      </section>
    </section>
  )
}
