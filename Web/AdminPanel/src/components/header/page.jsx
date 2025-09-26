import './Header.css';
import { FiMenu } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Header({ darkMode, setDarkMode, toggleSidebar }) {
  const [nameUser, setNameUser] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('nameUser');
    if (storedName) {
      setNameUser(storedName);
    }
  }, []);

  return (
    <header className="header">
      <button className="menu-button" onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>

      <h1>Movelaria Ponce</h1>

      <div className="header-right">
        <span className="welcome-text">Bem-vindo(a): {nameUser}</span>

        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </header>
  );
}
