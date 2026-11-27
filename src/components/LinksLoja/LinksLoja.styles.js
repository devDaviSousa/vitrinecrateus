import styled from "styled-components";

export const ContactSection = styled.section`
  margin: 0;
`;

export const SectionTitle = styled.h2`
  margin: ${({ $spaced }) => ($spaced ? "18px 8px 8px" : "0 8px 8px")};
  color: var(--brand-gray);
  font-size: 14px;
  font-weight: 600;

  @media (min-width: 761px) {
    font-size: 14px;
  }
`;

export const WebsiteCard = styled.div`
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 12px;
  border: 1px solid var(--gray-border);
  border-radius: 18px;
  color: var(--brand-gray);
  text-decoration: none;

  &[href] {
    cursor: pointer;
  }
  &[href]:hover {
    background: var(--gray-soft);
  }
  &:focus-visible {
    outline: 2px solid var(--brand-green);
    outline-offset: 2px;
  }

  @media (min-width: 761px) {
    min-height: 66px;
    padding: 12px 14px;
  }
`;

export const WebsiteText = styled.div`
  display: grid;
  gap: 2px;
  min-width: 0;
`;

export const WebsiteTitle = styled.strong`
  color: var(--brand-gray);
  font-size: 15px;
  font-weight: 600;
`;

export const WebsiteDescription = styled.span`
  overflow: hidden;
  color: var(--gray-muted);
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NetworkList = styled.div`
  overflow: hidden;
  padding: 2px 10px;
  border: 1px solid var(--gray-border);
  border-radius: 18px;
  background: var(--surface);

  @media (min-width: 761px) {
    padding: 4px 12px;
  }
`;

export const NetworkRow = styled.div`
  display: grid;
  grid-template-columns: 22px 1fr 18px;
  min-height: 39px;
  align-items: center;
  gap: 8px;
  color: var(--brand-gray);
  font-size: 14px;
  text-decoration: none;

  & + & {
    border-top: 1px solid var(--gray-soft);
  }
  &[href] {
    cursor: pointer;
  }
  &[href]:hover {
    color: var(--brand-green);
  }
  &:focus-visible {
    outline: 2px solid var(--brand-green);
    outline-offset: 2px;
  }

  @media (min-width: 761px) {
    min-height: 46px;
    font-size: 15px;
  }
`;

export const NetworkIcon = styled.span`
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
`;

export const LinkChevron = styled.span`
  display: grid;
  place-items: center;
  color: var(--gray-muted);

  svg {
    transform: rotate(-90deg);
  }
`;

export const ContactHint = styled.p`
  margin: 7px 10px 0;
  color: var(--gray-muted);
  font-size: 12px;
`;
