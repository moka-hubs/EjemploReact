import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import ProductoCard from '../components/ProductoCard.jsx'
import { productos } from '../data/productos.js'

export default function Catalogo() {
  const [params, setParams] = useSearchParams()
  const categoria = params.get('categoria') ?? 'Todos Los Productos'

  const lista = useMemo(
    () =>
      categoria === 'Todos Los Productos'
        ? productos
        : productos.filter((p) => p.categoria === categoria),
    [categoria],
  )

  const titulo = categoria === 'Todos Los Productos' ? 'Todos Nuestros Productos' : categoria

  return (
    <section className="productos container-fluid" id="catalogo">
      <h1
        id="titulo-catalogo"
        className="text-center d-flex justify-content-center align-items-center"
      >
        {titulo}
      </h1>
      <p className="text-center">
        Mostrando {lista.length} {lista.length === 1 ? 'producto' : 'productos'}
      </p>

      <div className="row justify-content-center">
        {lista.map((producto) => (
          <ProductoCard key={producto.codigo} producto={producto} />
        ))}
      </div>

      {categoria !== 'Todos Los Productos' && (
        <div className="text-center mb-5">
          <button
            type="button"
            className="btn"
            onClick={() => setParams({})}
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </section>
  )
}
