import styled from "styled-components";

export const CartItemContainer = styled.article`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 34px 22px;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 64px;
  padding: 6px 8px;
  border: 1px solid var(--gray-border);
  border-radius: 8px;
  background: var(--surface);
`;

export const ItemImage = styled.img`
  display: block;
  width: 48px;
  height: 48px;
  border-radius: 5px;
  background: var(--gray-soft);
  object-fit: cover;
`;

export const ItemImageFallback = styled.div`
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 5px;
  background: var(--gray-soft);
  color: var(--gray-muted);
  font-size: 22px;
  font-weight: 600;
`;

export const ItemInfo = styled.div`
  display: grid;
  min-width: 0;
  align-content: center;
`;

export const ItemName = styled.span`
  overflow: hidden;
  color: var(--brand-gray);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemShipping = styled.span`
  overflow: hidden;
  color: var(--gray-muted);
  font-size: 13px;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemPrice = styled.strong`
  color: var(--brand-gray);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.3;
`;

export const QuantitySelect = styled.select`
  width: 34px;
  height: 23px;
  padding: 0 2px;
  border: 1px solid var(--gray-border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--brand-gray);
  font: inherit;
  font-size: 13px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--brand-green);
    outline-offset: 2px;
  }
`;

export const RemoveButton = styled.button`
  display: grid;
  width: 22px;
  height: 26px;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #d94343;
  cursor: pointer;

  &:hover {
    background: rgba(217, 67, 67, 0.08);
  }
  &:focus-visible {
    outline: 2px solid var(--brand-green);
    outline-offset: 2px;
  }
`;
