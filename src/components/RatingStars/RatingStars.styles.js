import styled from 'styled-components';

export const Rating = styled.strong`
  color: var(--gray-muted);
  font-size: 25px;
  font-weight: 500;
  letter-spacing: -.055em;
  line-height: 1;
  font-variant-numeric: tabular-nums;

  @media (max-width: 380px) { font-size: 22px; }
`;

export const Stars = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 1px;
  font-size: 19px;
  line-height: 1;

  @media (max-width: 380px) { font-size: 16px; }
`;

export const Star = styled.span`
  color: ${({ $filled }) => ($filled ? '#f5c542' : 'var(--gray-border)')};
`;
