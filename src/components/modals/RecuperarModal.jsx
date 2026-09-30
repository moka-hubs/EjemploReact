import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext.jsx'
import { useModales } from '../../context/ModalesContext.jsx'

export default function RecuperarModal() {
  const { recuperar, cerrarRecuperar } = useModales()
  const { recuperarContrasena } = useAuth()
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState(null)

  function manejarEnvio(evento) {
    evento.preventDefault()
    const { ok, error, password } = recuperarContrasena(correo)
    if (ok) {
      setMensaje({ tipo: 'success', texto: `¡Cuenta encontrada! Tu contraseña es: ${password}` })
    } else {
      setMensaje({ tipo: 'danger', texto: error })
    }
  }

  return (
    <Modal
      id="recuperarModal"
      show={recuperar}
      onHide={cerrarRecuperar}
      centered
      onExited={() => {
        setCorreo('')
        setMensaje(null)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title as="h1" className="fs-5">
          Recupera tu contraseña
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="recuperarForm" onSubmit={manejarEnvio}>
          <Form.Group className="mb-3" controlId="recuperarcorreo">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit" className="w-100">
              Recuperar
            </Button>
          </div>
        </Form>

        {mensaje && <div className={`mt-3 text-center text-${mensaje.tipo}`}>{mensaje.texto}</div>}
      </Modal.Body>
    </Modal>
  )
}
