import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { cuponValido } from '../data/productos.js'
import { adminCredenciales } from '../data/admin.js'

const AuthContext = createContext(null)

const CLAVE_USUARIOS = 'pasteleria_mil_sabores'
const CLAVE_SESION = 'pasteleria_mil_sabores_sesion'
const CLAVE_ADMIN = 'pasteleria_mil_sabores_admin'

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_VALIDA = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
const EDAD_MINIMA = 10
const EDAD_MAXIMA = 90

const leer = (clave, porDefecto) => {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? porDefecto
  } catch {
    return porDefecto
  }
}

export function edadDesde(fechaNacimiento) {
  const nacimiento = new Date(`${fechaNacimiento}T00:00:00`)
  if (Number.isNaN(nacimiento.getTime())) return null
  const hoy = new Date()
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const mes = hoy.getMonth() - nacimiento.getMonth()
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad -= 1
  return edad
}

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => leer(CLAVE_USUARIOS, []))
  const [usuarioActual, setUsuarioActual] = useState(() => leer(CLAVE_SESION, null))
  const [esAdmin, setEsAdmin] = useState(() => leer(CLAVE_ADMIN, false))

  useEffect(() => {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
  }, [usuarios])

  useEffect(() => {
    if (usuarioActual) {
      localStorage.setItem(CLAVE_SESION, JSON.stringify(usuarioActual))
    } else {
      localStorage.removeItem(CLAVE_SESION)
    }
  }, [usuarioActual])

  useEffect(() => {
    localStorage.setItem(CLAVE_ADMIN, JSON.stringify(esAdmin))
  }, [esAdmin])

  const registrar = useCallback(
    ({ nombre, apellido, correo, password, fechaNacimiento, cupon }) => {
      if (!nombre || nombre.trim().length < 3) {
        return { ok: false, error: 'El nombre no puede estar vacío y debe ser mayor a 3 caracteres' }
      }
      if (!apellido || apellido.trim().length < 3) {
        return { ok: false, error: 'El apellido no puede estar vacío y debe ser mayor a 3 caracteres' }
      }
      if (!CORREO_VALIDO.test(correo)) {
        return { ok: false, error: 'El correo no cumple con el formato correcto' }
      }
      if (!PASSWORD_VALIDA.test(password)) {
        return { ok: false, error: 'La contraseña debe tener mínimo 6 caracteres, incluir una letra y un número' }
      }
      if (!fechaNacimiento) {
        return { ok: false, error: 'Debes seleccionar tu fecha de nacimiento' }
      }

      const edad = edadDesde(fechaNacimiento)
      if (edad === null) return { ok: false, error: 'Fecha no válida' }
      if (edad > EDAD_MAXIMA) {
        return { ok: false, error: `La fecha de nacimiento supera el límite de ${EDAD_MAXIMA} años de antigüedad` }
      }
      if (edad < EDAD_MINIMA) {
        return { ok: false, error: `Debes tener al menos ${EDAD_MINIMA} años para registrarte` }
      }
      if (cupon && cupon !== cuponValido) {
        return { ok: false, error: 'Cupón no válido' }
      }
      if (usuarios.some((u) => u.correo === correo)) {
        return { ok: false, error: 'El correo ya se encuentra registrado' }
      }

      const nuevo = {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo,
        password,
        fechaNacimiento,
        cupon: cupon || null,
        tieneDescuento: cupon === cuponValido,
        esDuoc: correo.toLowerCase().endsWith('@duocuc.cl'),
      }
      setUsuarios((previos) => [...previos, nuevo])
      return { ok: true }
    },
    [usuarios],
  )

  const iniciar = useCallback(
    (correo, password) => {
      if (usuarios.length === 0) return { ok: false, error: 'No hay usuarios registrados' }
      const encontrado = usuarios.find((u) => u.correo === correo && u.password === password)
      if (!encontrado) return { ok: false, error: 'Error en las credenciales' }
      setUsuarioActual(encontrado)
      return { ok: true }
    },
    [usuarios],
  )

  const cerrarSesion = useCallback(() => setUsuarioActual(null), [])

  const iniciarAdmin = useCallback((correo, password) => {
    if (correo !== adminCredenciales.correo || password !== adminCredenciales.password) {
      return { ok: false, error: 'Credenciales de administrador incorrectas' }
    }
    setEsAdmin(true)
    return { ok: true }
  }, [])

  const cerrarSesionAdmin = useCallback(() => setEsAdmin(false), [])

  const recuperarContrasena = useCallback(
    (correo) => {
      if (!correo) return { ok: false, error: 'Por favor, ingrese un correo electrónico' }
      const cuenta = usuarios.find((u) => u.correo === correo)
      if (!cuenta) return { ok: false, error: 'Este correo no se encuentra registrado' }
      return { ok: true, password: cuenta.password }
    },
    [usuarios],
  )

  const descuentos = useMemo(() => {
    if (!usuarioActual) return { total: 0, etiquetas: [] }
    const etiquetas = []
    if (usuarioActual.tieneDescuento) etiquetas.push('Cupón FELICES50: 10% de por vida')
    if (edadDesde(usuarioActual.fechaNacimiento) >= 50) etiquetas.push('Mayor de 50 años: 50%')
    if (usuarioActual.esDuoc) etiquetas.push('Torta de cumpleaños gratis (Duoc UC)')
    return { etiquetas }
  }, [usuarioActual])

  const valor = useMemo(
    () => ({
      usuarios,
      usuarioActual,
      descuentos,
      estaLogueado: Boolean(usuarioActual),
      esAdmin,
      registrar,
      iniciar,
      cerrarSesion,
      iniciarAdmin,
      cerrarSesionAdmin,
      recuperarContrasena,
    }),
    [usuarios, usuarioActual, descuentos, esAdmin, registrar, iniciar, cerrarSesion, iniciarAdmin, cerrarSesionAdmin, recuperarContrasena],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return contexto
}

export function precioConDescuento(precio, usuarioActual) {
  if (!usuarioActual) return precio
  let resultado = precio
  if (usuarioActual.tieneDescuento) resultado *= 0.9
  if (edadDesde(usuarioActual.fechaNacimiento) >= 50) resultado *= 0.5
  return Math.round(resultado)
}
