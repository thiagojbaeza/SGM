import { useState } from 'react';
import { FiHome, FiClipboard, FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import './LogoutModal.css';
import './SlideMenu.css';

export default function Sidebar({ open }) {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [cadastrosOpen, setCadastrosOpen] = useState(false);
  const [configuracoesOpen, setConfiguracoesOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
        <nav>
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/" className="menu-button">
                <FiHome className="icon" />
                <span className="menu-text">Home</span>
              </Link>
            </li>
            <li>
              <button onClick={() => setCadastrosOpen(true)} className="menu-button">
                <FiClipboard className="icon" />
                <span className="menu-text">Cadastros</span>
              </button>
            </li>
            <li>
              <button onClick={() => setConfiguracoesOpen(true)} className="menu-button">
                <FiSettings className="icon" />
                <span className="menu-text">Configurações</span>
              </button>
            </li>
            <li>
              <button onClick={() => setLogoutModalOpen(true)} className="menu-button">
                <FiLogOut className="icon" />
                <span className="menu-text">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Modal de logout centralizado */}
      {logoutModalOpen && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h2>Deseja realmente sair?</h2>
            <div className="modal-buttons">
              <button className="confirm" onClick={handleLogout}>Sim</button>
              <button className="cancel" onClick={() => setLogoutModalOpen(false)}>Não</button>
            </div>
          </div>
        </div>
      )}

      {/* Menu lateral: Cadastros */}
      <div className={`slide-menu-left ${cadastrosOpen ? 'open' : ''}`}>
        <div className="slide-header">
          <h2>Cadastros</h2>
          <button className="close-btn" onClick={() => setCadastrosOpen(false)}>×</button>
        </div>
        <div className="slide-section">
          <ul>
            <li><Link to="/maquina" onClick={() => setCadastrosOpen(false)}>Máquina</Link></li>
            <li><Link to="/statusmaquina" onClick={() => setCadastrosOpen(false)}>Status da Máquina</Link></li>
            <li><Link to="/motivopausa" onClick={() => setCadastrosOpen(false)}>Motivo da Pausa</Link></li>
            <li><Link to="/motivorefugo" onClick={() => setCadastrosOpen(false)}>Motivo do Refugo</Link></li>
          </ul>
        </div>
      </div>

      {/* Menu lateral: Configurações */}
      <div className={`slide-menu-left ${configuracoesOpen ? 'open' : ''}`}>
        <div className="slide-header">
          <h2>Configurações</h2>
          <button className="close-btn" onClick={() => setConfiguracoesOpen(false)}>×</button>
        </div>
        <div className="slide-section">
          <ul>
            <li><Link to="/usuarios" onClick={() => setConfiguracoesOpen(false)}>Usuários</Link></li>
            <li><Link to="/tipousuario" onClick={() => setConfiguracoesOpen(false)}>Tipo de Usuário</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
