import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CarritoContext = createContext(null)

const CLAVE = 'carrito'

const leerGuardado = () => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? []
  } catch {
    return []
  }
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerGuardado)

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(items))
  }, [items])

  const agregar = (codigo) => {
    setItems((previos) => {
      const existente = previos.find((item) => item.codigo === codigo)
      if (existente) {
        return previos.map((item) =>
          item.codigo === codigo ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }
      return [...previos, { codigo, cantidad: 1 }]
    })
  }

  const cambiarCantidad = (codigo, delta) => {
    setItems((previos) =>
      previos
        .map((item) =>
          item.codigo === codigo ? { ...item, cantidad: item.cantidad + delta } : item,
        )
        .filter((item) => item.cantidad > 0),
    )
  }

  const eliminar = (codigo) => {
    setItems((previos) => previos.filter((item) => item.codigo !== codigo))
  }

  const vaciar = () => setItems([])

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0)

  const valor = useMemo(() => ({ items, agregar, cambiarCantidad, eliminar, vaciar, cantidadTotal }), [
    items,
    cantidadTotal,
  ])

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return contexto
}
