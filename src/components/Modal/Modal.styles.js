import styled from 'styled-components';

export const ModalDialog = styled.dialog`
  width: min(calc(100vw - 32px), ${({ $maxWidth }) => $maxWidth});
  max-height: calc(100vh - 32px);
  margin: auto;
  padding: 24px;
  overflow: auto;
  border: 1px solid var(--gray-border);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: 0 24px 80px rgba(0, 0, 0, .3);
  color: var(--brand-gray);

  &::backdrop {
    background: rgba(0, 0, 0, .56);
    backdrop-filter: blur(4px);
  }

  @media (max-width: 380px) { padding: 20px; }
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const ModalSubtitle = styled.p`
  margin: 0 0 6px;
  color: var(--gray-muted);
  font-size: 14px;
  font-weight: 500;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: var(--brand-gray);
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -.04em;
`;

export const ModalCloseButton = styled.button`
  display: grid;
  flex: 0 0 36px;
  margin-left: auto;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 1px solid var(--gray-border);
  border-radius: 50%;
  background: var(--gray-soft);
  color: var(--brand-gray);
  font-size: 25px;
  line-height: 1;
  cursor: pointer;

  &:focus-visible { outline: 2px solid var(--brand-green); outline-offset: 3px; }
`;
