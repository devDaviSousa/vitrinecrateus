import { Icon } from '../Icon/Icon.jsx';
import { ToggleButton } from './ThemeToggle.styles.js';

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';
  const label = isDark ? 'Ativar tema claro' : 'Ativar tema noturno';

  return (
    <ToggleButton type="button" onClick={onToggle} aria-label={label} aria-pressed={isDark} title={label}>
      <Icon name={isDark ? 'sun' : 'moon'} size={19} />
    </ToggleButton>
  );
}
