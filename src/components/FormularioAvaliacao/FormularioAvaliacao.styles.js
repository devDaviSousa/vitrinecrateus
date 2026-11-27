import styled from "styled-components";

export const ReviewFormContainer = styled.form`
  display: grid;
  gap: 16px;
  margin-top: 18px;
`;

export const FormField = styled.div`
  display: grid;
  gap: 7px;
`;

export const FormLabel = styled.label`
  color: var(--brand-gray);
  font-size: 16px;
  font-weight: 600;
`;

const formControlStyles = `
  width: 100%;
  border: 1px solid var(--gray-border);
  border-radius: 12px;
  background: var(--page-background);
  color: var(--brand-gray);
  font: inherit;
  font-size: 15px;

  &:focus { outline: 2px solid var(--brand-green); outline-offset: 2px; }
  &::placeholder { color: var(--gray-muted); }
`;

export const FormInput = styled.input`
  ${formControlStyles}
  min-height: 44px;
  padding: 10px 12px;
`;

export const FormTextarea = styled.textarea`
  ${formControlStyles}
  min-height: 110px;
  padding: 12px;
  resize: vertical;
`;

export const FormError = styled.span`
  color: var(--gray-muted);
  font-size: 13px;
`;

export const RatingChoices = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RatingChoice = styled.label`
  position: relative;
  display: inline-grid;
  width: 38px;
  height: 38px;
  place-items: center;
  cursor: pointer;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    clip-path: inset(50%);
  }

  span {
    color: ${({ $selected }) => ($selected ? "#f5c542" : "var(--gray-border)")};
    font-size: 42px;
    line-height: 0;
    transition:
      color 0.15s ease,
      transform 0.15s ease;
  }

  &:hover span {
    transform: scale(1.12);
  }
`;

export const SubmitReviewButton = styled.button`
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid var(--brand-green);
  border-radius: 14px;
  background: var(--brand-green);
  color: var(--surface-white);
  font: inherit;
  font-size: 18px;
  font-weight: 600;
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
