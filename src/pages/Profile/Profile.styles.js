import styled from 'styled-components';

export const ProfileDetails = styled.div`
  display: grid;
  gap: 14px;
  margin: 20px 0 24px;
`;

export const ProfileRow = styled.div`
  display: grid;
  gap: 5px;
  padding: 14px;
  border: 1px solid var(--gray-border);
  border-radius: 12px;
  background: var(--page-background);
  color: var(--brand-gray);
  overflow-wrap: anywhere;
`;

export const ProfileLabel = styled.span`
  color: var(--gray-muted);
  font-size: 13px;
`;
