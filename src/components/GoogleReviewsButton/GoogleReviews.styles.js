import styled from "styled-components";

export const ReviewSummary = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 28px;
  margin: 18px auto 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--gray-muted);
  font: inherit;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    opacity: 0.82;
  }
  &:focus-visible {
    outline: 2px solid var(--brand-green);
    outline-offset: 4px;
  }

  @media (max-width: 380px) {
    gap: 5px;
  }
`;

export const ReviewCount = styled.span`
  color: var(--gray-muted);
  font-size: 13px;
  font-weight: 400;

  @media (max-width: 380px) {
    font-size: 12px;
  }
`;
