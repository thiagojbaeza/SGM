import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout.jsx';
import Home from './components/home/page';
import Produtos from './components/produtos/page';
import TipoProdutos from './components/tipoprodutos/page';
import Login from './components/login/page';

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//colocar a funcao para validar o token, caso negativo efetuar o logout e lipar o cache

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

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
              <Layout
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
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
