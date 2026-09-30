import { Container } from 'react-bootstrap'

export default function Nosotros() {
  return (
    <section className="nosotros" id="nosotros">
      <Container>
        <div className="row align-items-center">
          <h1 className="text-center d-flex justify-content-center align-items-center w-100 mb-4">
            Sobre nosotros
          </h1>
          <div className="col-md-6 text-center">
            <h1>Nuestra Misión</h1>
            <p>
              Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas
              y productos de repostería de alta calidad para todas las ocasiones, mientras
              celebramos nuestras raíces históricas y fomentamos la creatividad en la repostería.
            </p>
          </div>
          <div className="col-md-6">
            <h1>Visión</h1>
            <p>
              Convertirnos en la tienda online líder de productos de repostería en Chile, conocida
              por nuestra innovación, calidad y el impacto positivo en la comunidad, especialmente
              en la formación de nuevos talentos en gastronomía.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
