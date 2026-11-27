import styled from "styled-components";

export const Card = styled.article`
  overflow: hidden;
  padding: 10px;
  border: 1px solid var(--gray-border);
  border-radius: 36px;
  background: var(--surface);
  box-shadow: var(--card-shadow);
  transition:
    transform 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--card-shadow-hover);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

export const Cover = styled.div`
  position: relative;
  aspect-ratio: 0.94;
  overflow: hidden;
  border-radius: 29px;
  background: linear-gradient(135deg, var(--gray-soft), var(--surface));

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  ${Card}:hover & img {
    transform: scale(1.035);
  }

  @media (max-width: 600px) {
    aspect-ratio: 1.52;
  }

  @media (max-width: 600px) and (max-height: 700px) {
    aspect-ratio: 1.9;
  }
`;

export const ImageFallback = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  background: linear-gradient(145deg, var(--gray-soft), var(--surface));
  color: var(--gray-muted);
  font-size: 54px;
  font-weight: 600;
  letter-spacing: -0.09em;
`;

export const CategoryTag = styled.span`
  position: absolute;
  left: 14px;
  bottom: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid var(--gray-border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--brand-gray);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  backdrop-filter: blur(14px);

  svg {
    flex: 0 0 auto;
  }
`;

export const Content = styled.div`
  padding: 20px 23px 18px;
`;

export const CompanyName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-width: 0;
  color: var(--brand-gray);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.055em;
  line-height: 1.16;
  text-align: center;

  span:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 8px;
  color: var(--gray-muted);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.015em;

  svg {
    width: 15px;
    height: 15px;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
`;

export const FollowButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 126px;
  height: 50px;
  padding: 0 17px;
  border: 1px solid var(--brand-green);
  border-radius: 999px;
  background: var(--brand-green);
  box-shadow:
    0 4px 12px var(--gray-shadow),
    inset 0 1px rgba(255, 255, 255, 0.16);
  color: var(--surface-white);
  font: inherit;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.03em;
  text-decoration: none;
  cursor: pointer;
  transition:
    background 160ms ease,
    transform 160ms ease;

  &:hover {
    transform: scale(1.025);
  }
  &:active {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: 3px solid var(--brand-green);
    outline-offset: 3px;
  }
`;
