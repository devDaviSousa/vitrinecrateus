import { useEffect, useState } from 'react';
import { clearAccessToken, getAuthenticatedUser } from '../../services/api.js';
import {
  AuthCard,
  AuthPageShell,
  AuthTitle,
  BackLink,
  AuthSubmit,
} from '../Auth/Auth.styles.js';
import {
  ProfileDetails,
  ProfileLabel,
  ProfileRow,
} from './Profile.styles.js';

export default function Profile() {
  const [user] = useState(() => getAuthenticatedUser());

  useEffect(() => {
    if (!user) {
      clearAccessToken();
      window.location.replace('/login?returnTo=%2Fperfil');
    }
  }, [user]);

  const handleLogout = () => {
    clearAccessToken();
    window.location.assign('/');
  };

  if (!user) {
    return (
      <AuthPageShell>
        <AuthCard>
          <p role="status">Redirecionando para o login...</p>
        </AuthCard>
      </AuthPageShell>
    );
  }

  return (
    <AuthPageShell>
      <AuthCard>
        <BackLink href="/">← Voltar para a Vitrine</BackLink>
        <AuthTitle>Meu perfil</AuthTitle>
        <ProfileDetails>
          <ProfileRow>
            <ProfileLabel>Nome</ProfileLabel>
            <span>{user.name}</span>
          </ProfileRow>
          <ProfileRow>
            <ProfileLabel>E-mail</ProfileLabel>
            <span>{user.email}</span>
          </ProfileRow>
        </ProfileDetails>
        <AuthSubmit type="button" onClick={handleLogout}>Sair da conta</AuthSubmit>
      </AuthCard>
    </AuthPageShell>
  );
}
