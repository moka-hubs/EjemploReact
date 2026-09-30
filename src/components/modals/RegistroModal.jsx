import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext.jsx'
import { useModales } from '../../context/ModalesContext.jsx'

const VACIO = {
  nombre: '',
  apellido: '',
  correo: '',
  password: '',
  fechaNacimiento: '',
  cupon: '',
}

export default function RegistroModal() {
  const { registro, cerrarRegistro, mostrarMensaje } = useModales()
  const { registrar } = useAuth()
  const [datos, setDatos] = useState(VACIO)
  const [mensaje, setMensaje] = useState(null)

  const actualizar = (campo) => (evento) =>
    setDatos((previos) => ({ ...previos, [campo]: evento.target.value }))

  function manejarEnvio(evento) {
    evento.preventDefault()
    const { ok, error } = registrar(datos)
    if (ok) {
      cerrarRegistro()
      mostrarMensaje('Registro exitoso, ya puedes ingresar a tu cuenta')
      setDatos(VACIO)
    } else {
      setMensaje({ tipo: 'danger', texto: error })
    }
  }

  return (
    <Modal id="registrarModal" show={registro} onHide={cerrarRegistro} centered onExited={() => setDatos(VACIO)}>
      <Modal.Header closeButton>
        <Modal.Title as="h1" className="fs-5">
          Crea tu cuenta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="registrarForm" onSubmit={manejarEnvio}>
          <Form.Group className="mb-3" controlId="regnombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre aquí..."
              value={datos.nombre}
              onChange={actualizar('nombre')}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="regapellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su apellido aquí..."
              value={datos.apellido}
              onChange={actualizar('apellido')}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="regcorreo">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              value={datos.correo}
              onChange={actualizar('correo')}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="regpassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mínimo 6 caracteres, con letra y número"
              value={datos.password}
              onChange={actualizar('password')}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="regfecha">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control
              type="date"
              value={datos.fechaNacimiento}
              onChange={actualizar('fechaNacimiento')}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="regcupon">
            <Form.Label>Cupón de Bienvenida</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su cupón de bienvenida"
              value={datos.cupon}
              onChange={actualizar('cupon')}
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" className="w-100">
              Registrarse
            </Button>
          </div>
        </Form>

        {mensaje && <div className={`mt-3 text-center text-${mensaje.tipo}`}>{mensaje.texto}</div>}
      </Modal.Body>
    </Modal>
  )
}
