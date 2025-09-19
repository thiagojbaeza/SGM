import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/home/page';
import Produtos from './components/produtos/page';
import TipoProdutos from './components/tipoprodutos/page';
import Login from './components/login/page';
import PrivateRoute from './routes/PrivateRoute.jsx';
import jwt_decode from 'jwt-decode';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica se o token existe e está válido
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { exp } = jwt_decode(token);
        if (Date.now() < exp * 1000) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Aplica tema e controla sidebar responsiva
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<Login />} />
        ) : (
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="produtos" element={<Produtos />} />
            <Route path="tipoprodutos" element={<TipoProdutos />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
