import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext.jsx'

export default function Admin() {
  const { iniciarAdmin } = useAuth()
  const navegar = useNavigate()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState(null)

  function manejarEnvio(evento) {
    evento.preventDefault()
    const { ok, error } = iniciarAdmin(correo, password)
    if (ok) {
      setCorreo('')
      setPassword('')
      setMensaje(null)
      navegar('/dashboard')
    } else {
      setMensaje({ tipo: 'danger', texto: error })
    }
  }

  return (
    <main>
      <Container className="d-flex justify-content-center align-items-center my-5">
        <div className="border rounded p-4 shadow-sm col-12 col-sm-8 col-md-6 col-lg-4">
          <Form onSubmit={manejarEnvio}>
            <h1 className="text-center fs-3 mb-4">Panel de Administracion</h1>

            <Form.Group className="mb-3" controlId="admincorreo">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@correo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="adminpassword">
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
              <Button type="submit" size="sm" className="w-100">
                Iniciar Sesión
              </Button>
            </div>
          </Form>

          {mensaje && <div className={`mt-3 text-center text-${mensaje.tipo}`}>{mensaje.texto}</div>}
        </div>
      </Container>
    </main>
  )
}
