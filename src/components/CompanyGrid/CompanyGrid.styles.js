import styled from 'styled-components';

export const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: 22px;

  @media (max-width: 900px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 600px) { grid-template-columns: minmax(0, 1fr); gap: 19px; }
`;

export const EmptyState = styled.div`
  padding: 52px 20px;
  border-radius: 26px;
  background: var(--surface);
  border: 1px solid var(--gray-border);
  color: var(--gray-muted);
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
`;

export const ErrorState = styled(EmptyState)`
  color: var(--brand-gray);

  p {
    margin: 0;
  }
`;

export const RetryButton = styled.button`
  min-height: 42px;
  margin-top: 16px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  background: var(--brand-green);
  color: var(--surface-white);
  font: inherit;
  font-weight: 600;
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid var(--brand-gray);
    outline-offset: 3px;
  }
`;
