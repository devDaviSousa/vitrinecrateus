import styled from "styled-components";
import { Stars } from "../RatingStars/RatingStars.styles.js";

export const ReviewCard = styled.article`
  padding: 16px;
  border: 1px solid var(--gray-border);
  border-radius: 16px;
  background: var(--page-background);
`;

export const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-muted);
  font-size: 16px;

  ${Stars} {
    font-size: 16px;
  }
`;

export const ReviewText = styled.p`
  margin: 0;
  color: var(--brand-gray);
  font-size: 15px;
  line-height: 1.5;
  overflow-wrap: anywhere;
`;
