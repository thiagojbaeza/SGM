import Header from './components/header/page';
import Sidebar from './components/sidebar/page';
import { Outlet } from 'react-router-dom';

export default function Layout({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }) {
  return (
    <div className="grid-container">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} />
      <main className={sidebarOpen ? 'main-content' : 'main-content full'}>
        <Outlet />
      </main>
    </div>
  );
}
