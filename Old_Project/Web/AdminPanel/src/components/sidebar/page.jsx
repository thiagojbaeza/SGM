import { useState } from 'react';
import Modal from 'react-modal';
import { FiHome, FiBox, FiTag, FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import './LogoutModal.css';

Modal.setAppElement('#root');

export default function Sidebar({ open }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href ='/'
  };

  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      <nav>
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">
              <FiHome className="icon" />
              Home
            </Link>
          </li>
          <li className={location.pathname === '/produtos' ? 'active' : ''}>
            <Link to="/produtos">
              <FiBox className="icon" />
              Produtos
            </Link>
          </li>
          <li className={location.pathname === '/tipoprodutos' ? 'active' : ''}>
            <Link to="/tipoprodutos">
              <FiTag className="icon" />
              Tipo de Produtos
            </Link>
          </li>
          <li className={location.pathname === '/usuarios' ? 'active' : ''}>
            <Link to="/usuarios">
              <FiTag className="icon" />
              Usuários
            </Link>
          </li>
          <li className={location.pathname === '/maquina' ? 'active' : ''}>
            <Link to="/maquina">
              <FiTag className="icon" />
              Máquinas
            </Link>
          </li>
          <li>
            <button onClick={openModal}>
              <FiLogOut className="icon" />
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Deseja realmente sair?</h2>
        <div className="modal-buttons">
          <button className="confirm" onClick={handleLogout}>Sim, sair</button>
          <button className="cancel" onClick={closeModal}>Cancelar</button>
        </div>
      </Modal>
    </aside>
  );
}
