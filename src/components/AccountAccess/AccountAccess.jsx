import { getAuthenticatedUser } from '../../services/api.js';
import { Icon } from '../Icon/Icon.jsx';
import { AccountLink } from './AccountAccess.styles.js';

export function AccountAccess({ positioned = false }) {
  const user = getAuthenticatedUser();
  const label = user ? `Ver perfil de ${user.name}` : 'Entrar na conta';

  return (
    <AccountLink
      href={user ? '/perfil' : '/login'}
      aria-label={label}
      title={user ? 'Meu perfil' : 'Entrar'}
      $positioned={positioned}
    >
      {user ? user.name.trim().charAt(0).toUpperCase() : <Icon name="people" size={19} />}
    </AccountLink>
  );
}
