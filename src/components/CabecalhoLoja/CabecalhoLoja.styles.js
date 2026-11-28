import styled from "styled-components";

export const StoreHeader = styled.header`
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 42px;
  align-items: center;
  min-height: 36px;
  margin-bottom: 20px;
`;

export const BackLink = styled.a`
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: var(--gray-soft);
  color: var(--brand-gray);
  transition:
    background 150ms ease,
    transform 150ms ease;

  svg {
    transform: rotate(90deg);
  }
  &:hover {
    background: var(--gray-border);
    transform: translateX(-1px);
  }
  &:focus-visible {
    outline: 2px solid var(--brand-green);
    outline-offset: 2px;
  }
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  color: var(--brand-gray);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-align: center;
`;
