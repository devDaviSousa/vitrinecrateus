import styled from "styled-components";

export const AuthPageShell = styled.main`
  display: grid;
  min-height: 100vh;
  place-items: center;
  padding: 28px 16px;
  background:
    radial-gradient(ellipse at 50% -22%, var(--page-glow), transparent 50%),
    var(--page-background);
`;

export const AuthCard = styled.section`
  width: min(100%, 460px);
  padding: 30px;
  border: 1px solid var(--gray-border);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: var(--card-shadow);

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

export const BackLink = styled.a`
  color: var(--brand-green);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;

  &:hover { text-decoration: underline; }
`;

export const AuthTitle = styled.h1`
  margin: 24px 0 7px;
  color: var(--brand-gray);
  font-size: 30px;
  letter-spacing: -0.04em;
`;

export const AuthDescription = styled.p`
  margin: 0 0 20px;
  color: var(--gray-muted);
  font-size: 14px;
  line-height: 1.5;
`;

export const AuthForm = styled.form`
  display: grid;
  gap: 16px;
`;

export const AuthField = styled.div`
  display: grid;
  gap: 7px;

  small {
    color: var(--gray-muted);
    font-size: 12px;
  }
`;

export const AuthLabel = styled.label`
  color: var(--brand-gray);
  font-size: 14px;
  font-weight: 600;
`;

export const AuthInput = styled.input`
  width: 100%;
  min-height: 46px;
  padding: 10px 12px;
  border: 1px solid var(--gray-border);
  border-radius: 12px;
  background: var(--page-background);
  color: var(--brand-gray);
  font: inherit;
  font-size: 15px;

  &:focus {
    outline: 2px solid var(--brand-green);
    outline-offset: 2px;
  }
`;

export const AuthSubmit = styled.button`
  min-height: 46px;
  border: 1px solid var(--brand-green);
  border-radius: 13px;
  background: var(--brand-green);
  color: var(--surface-white);
  font: inherit;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: wait;
    opacity: 0.65;
  }

  &:focus-visible {
    outline: 3px solid var(--brand-green);
    outline-offset: 3px;
  }
`;

export const AuthMessage = styled.p`
  margin: 0;
  color: var(--brand-gray);
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;
`;

export const AuthLink = styled.a`
  color: var(--brand-green);
  font-weight: 600;
  text-decoration: none;

  &:hover { text-decoration: underline; }
`;
