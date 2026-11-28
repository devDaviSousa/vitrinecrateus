import styled from 'styled-components';

export const AccountLink = styled.a`
  position: ${({ $positioned }) => ($positioned ? 'absolute' : 'relative')};
  top: ${({ $positioned }) => ($positioned ? '50%' : 'auto')};
  right: ${({ $positioned }) => ($positioned ? '52px' : 'auto')};
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  transform: ${({ $positioned }) => ($positioned ? 'translateY(-50%)' : 'none')};
  border: 1px solid var(--gray-border);
  border-radius: 50%;
  background: var(--surface);
  color: var(--brand-gray);
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background 160ms ease, transform 160ms ease;

  &:hover {
    background: var(--gray-soft);
    transform: ${({ $positioned }) => (
    $positioned ? 'translateY(calc(-50% - 1px))' : 'translateY(-1px)'
  )};
  }
  &:focus-visible {
    outline: 3px solid var(--brand-green);
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    ${({ $positioned }) => $positioned && 'left: 0; right: auto;'}
  }
`;
