import './Header.css';
import { FiMenu } from 'react-icons/fi';

export default function Header({ darkMode, setDarkMode, toggleSidebar }) {
  return (
    <header className="header">
      <button className="menu-button" onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>
      <h1>Movelaria Ponce</h1>
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span className="slider"></span>
      </label>
    </header>
  );
}
