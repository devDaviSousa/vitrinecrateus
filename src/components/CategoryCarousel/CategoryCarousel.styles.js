import styled from "styled-components";

export const Carousel = styled.section`
  width: 100%;
  margin: 27px auto 30px;

  @media (max-width: 600px) and (max-height: 700px) {
    margin: 10px auto;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1px 18px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: var(--brand-gray);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.015em;
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;

  span {
    margin-right: 3px;
    color: var(--gray-muted);
    font-size: 13px;
  }
`;

export const NavigationButton = styled.button`
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid var(--gray-border);
  border-radius: 50%;
  background: var(--surface);
  color: var(--brand-gray);
  cursor: pointer;

  &:first-of-type svg {
    transform: rotate(90deg);
  }
  &:last-of-type svg {
    transform: rotate(-90deg);
  }
  &:disabled {
    color: var(--gray-muted);
    cursor: default;
    opacity: 0.4;
  }
  &:focus-visible {
    outline: 3px solid var(--brand-green);
    outline-offset: 2px;
  }
`;

export const Scroller = styled.div`
  display: flex;
  gap: 9px;
  overflow-x: auto;
  padding: 3px 2px 9px;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;

  &::-webkit-scrollbar {
    display: none;
  }
  &[data-dragging="true"] {
    cursor: grabbing;
    scroll-behavior: auto;
    scroll-snap-type: none;
  }
`;

export const CategoryButton = styled.button`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 9px;
  min-height: 45px;
  max-width: 280px;
  padding: 5px 14px 5px 7px;
  border: 1px solid
    ${({ $selected }) =>
      $selected ? "var(--brand-green)" : "var(--gray-border)"};
  border-radius: 999px;
  background: ${({ $selected }) =>
    $selected ? "var(--brand-green)" : "var(--surface)"};
  color: ${({ $selected }) =>
    $selected ? "var(--surface-white)" : "var(--brand-gray)"};
  font: inherit;
  cursor: pointer;
  scroll-snap-align: start;
  transition:
    background 150ms ease,
    border-color 150ms ease,
    transform 150ms ease;

  &:hover {
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 3px solid var(--brand-green);
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    max-width: 235px;
  }
`;

export const CategoryIcon = styled.span`
  display: grid;
  flex: 0 0 31px;
  width: 31px;
  height: 31px;
  place-items: center;
  border-radius: 50%;
  background: ${({ $selected }) =>
    $selected ? "rgba(255,255,255,.16)" : "var(--gray-soft)"};
  color: ${({ $selected }) =>
    $selected ? "var(--surface-white)" : "var(--brand-gray)"};
`;

export const CategoryName = styled.span`
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.015em;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
