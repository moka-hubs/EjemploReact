import { Button, Modal } from 'react-bootstrap'
import { useModales } from '../../context/ModalesContext.jsx'

export default function ModalAgregado() {
  const { agregado, cerrarAgregado, verCarritoDesdeAgregado } = useModales()

  return (
    <Modal show={Boolean(agregado)} onHide={cerrarAgregado} centered contentClassName="modal-content">
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title as="h5" className="fs-5">
          <i className="bi bi-check-circle-fill me-2" />
          Producto Agregado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p className="fs-5 mb-0">&quot;{agregado}&quot; se agregó al carrito exitosamente.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={cerrarAgregado}>
          Seguir Comprando
        </Button>
        <Button variant="outline-success" onClick={verCarritoDesdeAgregado}>
          Ver Carrito
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
