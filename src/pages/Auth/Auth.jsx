import { useState } from 'react';
import { loginUser, registerUser } from '../../services/authService.js';
import { saveAuthSession } from '../../services/api.js';
import {
  AuthCard,
  AuthDescription,
  AuthField,
  AuthForm,
  AuthInput,
  AuthLabel,
  AuthLink,
  AuthMessage,
  AuthPageShell,
  AuthSubmit,
  AuthTitle,
  BackLink,
} from './Auth.styles.js';

function getErrorMessage(error) {
  const responseMessage = error.response?.data?.error ?? error.response?.data?.message;
  if (typeof responseMessage === 'string') return responseMessage;
  if (typeof error.message === 'string') return error.message;
  return 'Não foi possível concluir a operação. Tente novamente.';
}

function getReturnTo() {
  const requestedPath = new URLSearchParams(window.location.search).get('returnTo');
  if (
    requestedPath
    && requestedPath.startsWith('/')
    && !requestedPath.startsWith('//')
    && !['/login', '/entrar', '/cadastro'].includes(requestedPath.split('?')[0])
  ) {
    return requestedPath;
  }
  return '/';
}

export default function Auth({ initialMode = 'login' }) {
  const isRegister = initialMode === 'register';
  const returnTo = getReturnTo();
  const returnToQuery = `?returnTo=${encodeURIComponent(returnTo)}`;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (isRegister) {
        await registerUser({ name: name.trim(), email: email.trim(), password });
        setSuccessMessage('Cadastro concluído. Entre com seu e-mail e senha para avaliar.');
        return;
      }

      const session = await loginUser({ email: email.trim(), password });
      saveAuthSession(session);
      window.location.assign(returnTo);
    } catch (requestError) {
      setErrorMessage(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthPageShell>
      <AuthCard>
        <BackLink href="/">← Voltar para a Vitrine</BackLink>
        <AuthTitle>{isRegister ? 'Criar conta' : 'Entrar'}</AuthTitle>
        <AuthDescription>
          {isRegister
            ? 'Cadastre-se para avaliar os serviços da Vitrine Crateús.'
            : 'Entre para registrar ou atualizar sua nota para um serviço.'}
        </AuthDescription>

        <AuthForm onSubmit={handleSubmit}>
          {isRegister && (
            <AuthField>
              <AuthLabel htmlFor="auth-name">Nome</AuthLabel>
              <AuthInput
                id="auth-name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={120}
                required
              />
            </AuthField>
          )}
          <AuthField>
            <AuthLabel htmlFor="auth-email">E-mail</AuthLabel>
            <AuthInput
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </AuthField>
          <AuthField>
            <AuthLabel htmlFor="auth-password">Senha</AuthLabel>
            <AuthInput
              id="auth-password"
              name="password"
              type="password"
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={isRegister ? 8 : undefined}
              maxLength={72}
              required
            />
            {isRegister && <small>A senha deve ter entre 8 e 72 bytes.</small>}
          </AuthField>

          {errorMessage && <AuthMessage role="alert">{errorMessage}</AuthMessage>}
          {successMessage && (
            <AuthMessage role="status">
              {successMessage}{' '}
              <AuthLink href={`/login${returnToQuery}`}>Fazer login</AuthLink>
            </AuthMessage>
          )}

          <AuthSubmit type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Aguarde...'
              : isRegister
                ? 'Criar conta'
                : 'Entrar'}
          </AuthSubmit>
        </AuthForm>

        {!successMessage && (
          <AuthDescription>
            {isRegister ? 'Já tem uma conta? ' : 'Ainda não tem uma conta? '}
            <AuthLink href={`${isRegister ? '/login' : '/cadastro'}${returnToQuery}`}>
              {isRegister ? 'Entrar' : 'Cadastre-se'}
            </AuthLink>
          </AuthDescription>
        )}
      </AuthCard>
    </AuthPageShell>
  );
}
