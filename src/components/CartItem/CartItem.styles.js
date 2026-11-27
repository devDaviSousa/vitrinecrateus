import styled from "styled-components";

export const CartItemContainer = styled.article`
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) 34px 22px;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 72px;
  padding: 6px 8px;
  border: 1px solid var(--gray-border);
  border-radius: 8px;
  background: var(--surface);

  @media (min-width: 761px) {
    grid-template-columns: 76px minmax(0, 1fr) 42px 28px;
    gap: 12px;
    min-height: 96px;
    padding: 9px 12px;
    border-radius: 12px;
    box-shadow: 0 4px 14px var(--gray-shadow);
  }
`;

export const ItemImage = styled.img`
  display: block;
  width: 56px;
  height: 56px;
  border-radius: 5px;
  background: var(--gray-soft);
  object-fit: cover;

  @media (min-width: 761px) {
    width: 76px;
    height: 76px;
    border-radius: 8px;
  }
`;

export const ItemImageFallback = styled.div`
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border-radius: 5px;
  background: var(--gray-soft);
  color: var(--gray-muted);
  font-size: 22px;
  font-weight: 600;

  @media (min-width: 761px) {
    width: 76px;
    height: 76px;
  }
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

  @media (min-width: 761px) {
    font-size: 18px;
  }
`;

export const ItemShipping = styled.span`
  overflow: hidden;
  color: var(--gray-muted);
  font-size: 14px;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: 761px) {
    font-size: 14px;
  }
`;

export const ItemPrice = styled.strong`
  color: var(--brand-gray);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.3;

  @media (min-width: 761px) {
    font-size: 18px;
  }
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
  font-size: 14px;
  cursor: pointer;

  @media (min-width: 761px) {
    width: 42px;
    height: 28px;
    font-size: 14px;
  }

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

  @media (min-width: 761px) {
    width: 28px;
    height: 32px;
  }

  &:hover {
    background: rgba(217, 67, 67, 0.08);
  }
  &:focus-visible {
    outline: 2px solid var(--brand-green);
    outline-offset: 2px;
  }
`;
