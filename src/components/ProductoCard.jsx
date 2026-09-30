import { useCarrito } from '../context/CarritoContext.jsx'
import { useModales } from '../context/ModalesContext.jsx'
import { useAuth, precioConDescuento } from '../context/AuthContext.jsx'

export default function ProductoCard({ producto }) {
  const { agregar } = useCarrito()
  const { abrirAgregado } = useModales()
  const { usuarioActual } = useAuth()

  const precioFinal = precioConDescuento(producto.precio, usuarioActual)
  const tieneDescuento = precioFinal < producto.precio

  function handleAgregar() {
    agregar(producto.codigo)
    abrirAgregado(producto.nombre)
  }

  return (
    <div className="card col-12 col-md-6 col-lg-4 d-flex">
      <div className="d-flex flex-column h-100 p-2">
        <img
          src={`/img/${producto.imagen}`}
          alt={producto.nombre}
          className="img-fluid my-4"
          style={{ maxHeight: '300px' }}
        />
        <h3>{producto.nombre}</h3>
        {tieneDescuento ? (
          <>
            <p className="mb-0">
              <s>${producto.precio.toLocaleString('es-CL')} CLP</s>{' '}
              <strong className="text-success">
                ${precioFinal.toLocaleString('es-CL')} CLP
              </strong>
            </p>
            <small className="badge text-bg-success mb-2">Descuento aplicado</small>
          </>
        ) : (
          <p>${producto.precio.toLocaleString('es-CL')} CLP</p>
        )}
        <p>{producto.descripcion}</p>
        <button className="btn mt-auto" onClick={handleAgregar} disabled={producto.stock === 0}>
          {producto.stock === 0 ? 'Sin stock' : 'Agregar al carro'}
        </button>
      </div>
    </div>
  )
}
