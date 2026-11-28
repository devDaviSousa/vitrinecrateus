import styled from 'styled-components';

export const AdminPageShell = styled.main`
  min-height: 100vh;
  padding: 28px 20px 56px;
  background:
    radial-gradient(ellipse at 50% -22%, var(--page-glow), transparent 50%),
    var(--page-background);
  color: var(--brand-gray);
`;

export const AdminContent = styled.div`
  width: min(100%, 820px);
  margin: 0 auto;
`;

export const AdminHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
`;

export const BackToHome = styled.a`
  color: var(--gray-muted);
  font-size: 14px;
  text-decoration: none;

  &:hover {
    color: var(--brand-green);
  }
`;

export const AdminTitle = styled.h1`
  margin: 0;
  color: var(--brand-gray);
  font-size: clamp(28px, 5vw, 40px);
  letter-spacing: -0.05em;
`;

export const AdminDescription = styled.p`
  margin: 8px 0 28px;
  color: var(--gray-muted);
  font-size: 15px;
  line-height: 1.5;
`;

export const AdminSection = styled.section`
  margin-top: 20px;
  padding: 24px;
  border: 1px solid var(--gray-border);
  border-radius: 22px;
  background: var(--surface);
  box-shadow: var(--card-shadow);

  form > div:last-child {
    position: static;
    bottom: auto;
    padding: 0;
    background: transparent;
  }

  @media (max-width: 520px) {
    padding: 18px 14px;
    border-radius: 18px;
  }
`;

export const AdminSectionTitle = styled.h2`
  margin: 0;
  color: var(--brand-gray);
  font-size: 20px;
  letter-spacing: -0.03em;
`;

export const AdminSectionDescription = styled.p`
  margin: 7px 0 0;
  color: var(--gray-muted);
  font-size: 14px;
  line-height: 1.45;
`;
