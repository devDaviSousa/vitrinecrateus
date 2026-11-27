import styled from 'styled-components';

export const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  transform: translateY(-50%);
  border: 1px solid var(--gray-border);
  border-radius: 50%;
  background: var(--surface);
  color: var(--brand-gray);
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease, transform 160ms ease;

  &:hover { transform: translateY(calc(-50% - 1px)); background: var(--gray-soft); }
  &:active { transform: translateY(-50%) scale(.96); }
  &:focus-visible { outline: 3px solid var(--brand-green); outline-offset: 3px; }
`;
