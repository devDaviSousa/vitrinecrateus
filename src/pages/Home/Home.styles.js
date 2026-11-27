import styled from "styled-components";

export const Page = styled.main`
  min-height: 100vh;
  padding: 38px 28px 64px;
  background:
    radial-gradient(ellipse at 50% -22%, var(--page-glow), transparent 50%),
    var(--page-background);
  transition: background-color 180ms ease;

  @media (max-width: 600px) {
    padding: 18px 16px 44px;
  }
  @media (max-width: 600px) and (max-height: 700px) {
    padding-top: 12px;
  }
`;

export const Shell = styled.div`
  width: min(100%, 1120px);
  margin: 0 auto;
`;

export const Topbar = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  margin-bottom: 62px;

  @media (max-width: 600px) {
    margin-bottom: 42px;
  }
  @media (max-width: 600px) and (max-height: 700px) {
    margin-bottom: 24px;
  }
`;

export const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: var(--brand-gray);
  text-decoration: none;
  font-weight: 700;

  .brand-mark {
    display: inline-grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border-radius: 15px;
    background: var(--brand-mark);
    color: var(--surface-white);
    font-size: 17px;
    letter-spacing: -0.04em;
  }

  .brand-name {
    font-size: 24px;
    letter-spacing: -0.055em;
  }

  @media (max-width: 600px) {
    gap: 9px;

    .brand-mark {
      width: 42px;
      height: 42px;
      border-radius: 14px;
    }
    .brand-name {
      font-size: 21px;
    }
  }
`;

export const Intro = styled.section`
  max-width: 700px;
  margin: 0 auto 29px;
  text-align: center;

  h1 {
    margin: 0;
    color: var(--brand-gray);
    font-size: clamp(36px, 5.2vw, 55px);
    font-weight: 600;
    letter-spacing: -0.075em;
    line-height: 1.05;
  }

  p {
    margin: 13px 0 0;
    color: var(--gray-muted);
    font-size: 18px;
    letter-spacing: -0.025em;
    line-height: 1.5;
  }

  @media (max-width: 600px) {
    margin-bottom: 23px;
    text-align: center;
    h1 {
      font-size: 39px;
    }
    p {
      max-width: 340px;
      margin: 13px auto 0;
      font-size: 17px;
    }
  }
`;

export const SearchBox = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  width: min(100%, 520px);
  height: 54px;
  margin: 0 auto 23px;
  padding: 0 17px;
  border: 1px solid var(--gray-border);
  border-radius: 18px;
  background: var(--surface);
  box-shadow:
    0 8px 24px var(--gray-shadow),
    inset 0 1px var(--surface);
  color: var(--gray-muted);

  &:focus-within {
    border-color: var(--brand-gray);
    box-shadow: 0 0 0 4px var(--gray-soft);
  }
  svg {
    flex: 0 0 auto;
  }
  input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--brand-gray);
    font: inherit;
    font-size: 16px;
    letter-spacing: -0.02em;
  }
  input::placeholder {
    color: var(--gray-muted);
  }

  @media (max-width: 600px) and (max-height: 700px) {
    margin-bottom: 16px;
  }
`;

export const ResultLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1px 15px;
  color: var(--gray-muted);
  font-size: 14px;
  letter-spacing: -0.01em;

  strong {
    color: var(--brand-gray);
    font-weight: 600;
  }

  @media (max-width: 600px) and (max-height: 700px) {
    margin-bottom: 5px;
  }
`;

export const LoadMoreButton = styled.button`
  display: block;
  min-height: 46px;
  margin: 24px auto 0;
  padding: 0 20px;
  border: 1px solid var(--gray-border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--brand-gray);
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 150ms ease,
    transform 150ms ease;

  &:hover {
    background: var(--gray-soft);
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 3px solid var(--brand-green);
    outline-offset: 2px;
  }
`;
