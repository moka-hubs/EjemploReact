import { Container, Table } from 'react-bootstrap'
import { productos } from '../data/productos.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const { usuarios } = useAuth()

  return (
    <div className="app">
      <Container className="d-flex justify-content-center align-items-center my-5">
        <h1>Panel de Administracion</h1>
      </Container>

      <Container className="col-sm-8 mb-5" id="productosTabla">
        <h4>Productos</h4>
        <Table hover responsive>
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.codigo}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>${p.precio.toLocaleString('es-CL')}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Container className="col-sm-8 mb-5" id="clientesTabla">
        <h4>Clientes</h4>
        {usuarios.length === 0 ? (
          <p>Aun no hay clientes registrados.</p>
        ) : (
          <Table hover responsive>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Fecha de nacimiento</th>
                <th scope="col">Descuento</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.correo}>
                  <td>
                    {u.nombre} {u.apellido}
                  </td>
                  <td>{u.correo}</td>
                  <td>{u.fechaNacimiento}</td>
                  <td>{u.tieneDescuento ? 'FELICES50' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  )
}
