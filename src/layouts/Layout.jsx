import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import Footer from '../components/Footer.jsx'
import CarritoOffcanvas from '../components/CarritoOffcanvas.jsx'
import LoginModal from '../components/modals/LoginModal.jsx'
import RegistroModal from '../components/modals/RegistroModal.jsx'
import RecuperarModal from '../components/modals/RecuperarModal.jsx'
import ModalAgregado from '../components/modals/ModalAgregado.jsx'
import AvisoGlobal from '../components/AvisoGlobal.jsx'

export default function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />

      <CarritoOffcanvas />
      <LoginModal />
      <RegistroModal />
      <RecuperarModal />
      <ModalAgregado />
      <AvisoGlobal />
    </>
  )
}
