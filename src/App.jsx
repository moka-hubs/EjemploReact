import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'
import { ModalesProvider } from './context/ModalesContext.jsx'
import Layout from './layouts/Layout.jsx'
import RutaAdmin from './components/RutaAdmin.jsx'
import Home from './pages/Home.jsx'
import Catalogo from './pages/Catalogo.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Admin from './pages/Admin.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'

export default function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <ModalesProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="admin" element={<Admin />} />
              <Route
                path="dashboard"
                element={
                  <RutaAdmin>
                    <Dashboard />
                  </RutaAdmin>
                }
              />
              <Route path="*" element={<NoEncontrada />} />
            </Route>
          </Routes>
        </ModalesProvider>
      </CarritoProvider>
    </AuthProvider>
  )
}
