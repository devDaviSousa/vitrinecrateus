import { useTheme } from './hooks/useTheme/useTheme.js';
import Home from './pages/Home/Home.jsx';
import PaginaLoja from './pages/PaginaLoja/PaginaLoja.jsx';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  if (path === '/paginaloja' || path === '/loja') {
    return <PaginaLoja companyId={searchParams.get('companyId')} />;
  }

  return <Home theme={theme} toggleTheme={toggleTheme} />;
}
