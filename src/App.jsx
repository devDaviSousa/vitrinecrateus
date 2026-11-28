import { useTheme } from './hooks/useTheme/useTheme.js';
import Admin from './pages/Admin/Admin.jsx';
import Auth from './pages/Auth/Auth.jsx';
import Home from './pages/Home/Home.jsx';
import PaginaLoja from './pages/PaginaLoja/PaginaLoja.jsx';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  if (path === '/paginaloja' || path === '/loja') {
    return <PaginaLoja companyId={searchParams.get('companyId')} />;
  }

  if (path === '/admin' || path === '/painel-admin') {
    return <Admin theme={theme} toggleTheme={toggleTheme} />;
  }

  if (path === '/login' || path === '/entrar') {
    return <Auth initialMode="login" />;
  }

  if (path === '/cadastro') {
    return <Auth initialMode="register" />;
  }

  return <Home theme={theme} toggleTheme={toggleTheme} />;
}
