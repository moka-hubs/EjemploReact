import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const ModalesContext = createContext(null)

export function ModalesProvider({ children }) {
  const [login, setLogin] = useState(false)
  const [registro, setRegistro] = useState(false)
  const [recuperar, setRecuperar] = useState(false)
  const [carrito, setCarrito] = useState(false)
  const [agregado, setAgregado] = useState(null)
  const [mensajeGlobal, setMensajeGlobal] = useState(null)
  const temporizador = useRef(null)

  const mostrarMensaje = useCallback((texto) => {
    setMensajeGlobal(texto)
  }, [])

  const cerrarMensaje = useCallback(() => setMensajeGlobal(null), [])

  useEffect(() => {
    if (!mensajeGlobal) return
    clearTimeout(temporizador.current)
    temporizador.current = setTimeout(() => setMensajeGlobal(null), 4000)
    return () => clearTimeout(temporizador.current)
  }, [mensajeGlobal])

  const abrirCarrito = useCallback(() => setCarrito(true), [])
  const cerrarCarrito = useCallback(() => setCarrito(false), [])

  const verCarritoDesdeAgregado = useCallback(() => {
    setAgregado(null)
    setCarrito(true)
  }, [])

  const cerrarAgregado = useCallback(() => setAgregado(null), [])

  const valor = useMemo(
    () => ({
      login,
      registro,
      recuperar,
      carrito,
      agregado,
      abrirLogin: () => setLogin(true),
      cerrarLogin: () => setLogin(false),
      abrirRegistro: () => {
        setLogin(false)
        setRegistro(true)
      },
      cerrarRegistro: () => setRegistro(false),
      abrirRecuperar: () => {
        setLogin(false)
        setRecuperar(true)
      },
      cerrarRecuperar: () => setRecuperar(false),
      abrirCarrito,
      cerrarCarrito,
      abrirAgregado: (nombre) => setAgregado(nombre),
      cerrarAgregado,
      verCarritoDesdeAgregado,
      mensajeGlobal,
      mostrarMensaje,
      cerrarMensaje,
    }),
    [
      login,
      registro,
      recuperar,
      carrito,
      agregado,
      abrirCarrito,
      cerrarCarrito,
      cerrarAgregado,
      verCarritoDesdeAgregado,
      mensajeGlobal,
      mostrarMensaje,
      cerrarMensaje,
    ],
  )

  return <ModalesContext.Provider value={valor}>{children}</ModalesContext.Provider>
}

export function useModales() {
  const contexto = useContext(ModalesContext)
  if (!contexto) throw new Error('useModales debe usarse dentro de ModalesProvider')
  return contexto
}
