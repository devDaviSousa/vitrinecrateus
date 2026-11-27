import styled from "styled-components";
import { Rating, Stars } from "../RatingStars/RatingStars.styles.js";

export const DialogBody = styled.div`
  margin-top: 24px;
  padding: 18px;
  border: 1px solid var(--gray-border);
  border-radius: 18px;
  background: var(--page-background);
`;

export const DialogCompany = styled.p`
  margin: 0;
  color: var(--brand-gray);
  font-size: 17px;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

export const DialogScore = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;

  ${Rating} {
    font-size: 35px;
  }
  ${Stars} {
    font-size: 22px;
  }
`;

export const DialogMessage = styled.p`
  margin: 18px 0 0;
  color: var(--gray-muted);
  font-size: 15px;
  line-height: 1.5;
`;

export const DialogReviewCount = styled.p`
  margin: 8px 0 0;
  color: var(--gray-muted);
  font-size: 14px;
`;

export const WriteReviewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 46px;
  margin-top: 20px;
  padding: 0 18px;
  border: 1px solid var(--brand-green);
  border-radius: 14px;
  background: var(--brand-green);
  color: var(--surface-white);
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 3px solid var(--brand-green);
    outline-offset: 3px;
  }
`;
