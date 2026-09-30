import { Alert } from 'react-bootstrap'
import { useModales } from '../context/ModalesContext.jsx'

export default function AvisoGlobal() {
  const { mensajeGlobal, cerrarMensaje } = useModales()

  if (!mensajeGlobal) return null

  return (
    <Alert
      variant="success"
      dismissible
      onClose={cerrarMensaje}
      className="position-fixed bottom-0 start-50 translate-middle-x mb-4 shadow"
      style={{ zIndex: 1080, minWidth: '320px' }}
    >
      {mensajeGlobal}
    </Alert>
  )
}
