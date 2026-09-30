import { Offcanvas, Button } from 'react-bootstrap'
import { useCarrito } from '../context/CarritoContext.jsx'
import { useModales } from '../context/ModalesContext.jsx'
import { useAuth, precioConDescuento } from '../context/AuthContext.jsx'
import { getProductoPorCodigo } from '../data/productos.js'
import { useMemo } from 'react'

export default function CarritoOffcanvas() {
  const { items, cambiarCantidad, eliminar, vaciar } = useCarrito()
  const { carrito, cerrarCarrito } = useModales()
  const { usuarioActual, descuentos } = useAuth()

  const filas = useMemo(
    () =>
      items
        .map((item) => {
          const producto = getProductoPorCodigo(item.codigo)
          return producto ? { ...producto, cantidad: item.cantidad } : null
        })
        .filter(Boolean),
    [items],
  )

  const total = filas.reduce(
    (suma, fila) => suma + precioConDescuento(fila.precio, usuarioActual) * fila.cantidad,
    0,
  )
  const totalSinDescuento = filas.reduce(
    (suma, fila) => suma + fila.precio * fila.cantidad,
    0,
  )
  const ahorro = totalSinDescuento - total

  return (
    <Offcanvas show={carrito} onHide={cerrarCarrito} placement="end" aria-labelledby="carritoOffcanvasLabel">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="carritoOffcanvasLabel">Tu Carrito</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column justify-content-between">
        <div className="overflow-auto flex-grow-1">
          {filas.length === 0 ? (
            <p className="text-muted text-center my-4">El carrito está vacío.</p>
          ) : (
            filas.map((fila) => (
              <div key={fila.codigo} className="d-flex align-items-center border-bottom py-2">
                <img
                  src={`/img/${fila.imagen}`}
                  alt={fila.nombre}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  className="me-2 rounded"
                />
                <div className="flex-grow-1">
                  <h6 className="mb-0">{fila.nombre}</h6>
                  <small className="text-muted">
                    ${precioConDescuento(fila.precio, usuarioActual).toLocaleString('es-CL')} CLP
                  </small>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => cambiarCantidad(fila.codigo, -1)}
                    aria-label={`Quitar una unidad de ${fila.nombre}`}
                  >
                    -
                  </Button>
                  <span className="mx-2">{fila.cantidad}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => cambiarCantidad(fila.codigo, 1)}
                    disabled={fila.cantidad >= fila.stock}
                    aria-label={`Agregar otra unidad de ${fila.nombre}`}
                  >
                    +
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => eliminar(fila.codigo)}
                    aria-label={`Eliminar ${fila.nombre} del carrito`}
                  >
                    <i className="bi bi-trash" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-top pt-3">
          {ahorro > 0 && (
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-success">Ahorro</span>
              <span className="text-success fw-bold">-${ahorro.toLocaleString('es-CL')} CLP</span>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <strong>Total:</strong>
            <span className="fs-5 fw-bold">${total.toLocaleString('es-CL')} CLP</span>
          </div>
          {descuentos.etiquetas.length > 0 && (
            <ul className="list-unstyled small text-success mb-2">
              {descuentos.etiquetas.map((etiqueta) => (
                <li key={etiqueta}>
                  <i className="bi bi-tag" /> {etiqueta}
                </li>
              ))}
            </ul>
          )}
          <Button variant="outline-danger" className="w-100 mb-2" onClick={vaciar} disabled={filas.length === 0}>
            Vaciar Carrito
          </Button>
          <Button variant="success" className="w-100" disabled={filas.length === 0}>
            Finalizar Compra
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
