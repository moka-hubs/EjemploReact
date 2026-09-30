import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export default function NoEncontrada() {
  return (
    <Container className="text-center my-5">
      <h1 className="mb-3">404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/" className="btn btn-hero">
        Volver al inicio
      </Link>
    </Container>
  )
}
