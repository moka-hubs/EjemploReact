import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext.jsx'
import { useModales } from '../../context/ModalesContext.jsx'

export default function LoginModal() {
  const { login, abrirRegistro, abrirRecuperar, cerrarLogin, mostrarMensaje } = useModales()
  const { iniciar } = useAuth()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState(null)

  function limpiar() {
    setCorreo('')
    setPassword('')
    setMensaje(null)
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    const { ok, error } = iniciar(correo, password)
    if (ok) {
      limpiar()
      cerrarLogin()
      mostrarMensaje('Bienvenido nuevamente a Pasteleria Mil Sabores')
    } else {
      setMensaje({ tipo: 'danger', texto: error })
    }
  }

  return (
    <Modal id="loginModal" show={login} onHide={cerrarLogin} centered onExited={limpiar}>
      <Modal.Header closeButton>
        <Modal.Title as="h1" className="fs-5">
          Iniciar Sesión
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="loginForm" onSubmit={manejarEnvio}>
          <Form.Group className="mb-3" controlId="logincorreo">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginpassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" className="w-100">
              Iniciar Sesión
            </Button>
          </div>
          <div className="text-center mt-2">
            <Button type="button" variant="link" className="w-100" onClick={abrirRecuperar}>
              Recuperar Contraseña
            </Button>
            <Button type="button" variant="link" className="w-100" onClick={abrirRegistro}>
              Crear una cuenta
            </Button>
          </div>
        </Form>

        {mensaje && <div className={`mt-3 text-center text-${mensaje.tipo}`}>{mensaje.texto}</div>}
      </Modal.Body>
    </Modal>
  )
}
