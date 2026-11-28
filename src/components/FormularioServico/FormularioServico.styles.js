import styled from 'styled-components';

export const FormularioServicoContainer = styled.form`
  display: grid;
  gap: 20px;
  margin-top: 20px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns = 1 }) => $columns}, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const FormField = styled.div`
  display: grid;
  align-content: start;
  gap: 7px;
  min-width: 0;
`;

export const FormCheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--brand-gray);
  font-size: 14px;
  cursor: pointer;
`;

export const FormCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: var(--brand-green);
  cursor: pointer;
`;

export const FormLabel = styled.label`
  color: var(--brand-gray);
  font-size: 14px;
  font-weight: 600;
`;

const formControlStyles = `
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid var(--gray-border);
  border-radius: 12px;
  background: var(--page-background);
  color: var(--brand-gray);
  font: inherit;
  font-size: 15px;

  &:focus {
    outline: 2px solid var(--brand-green);
    outline-offset: 2px;
  }
  &::placeholder {
    color: var(--gray-muted);
  }
  &:disabled {
    opacity: 0.65;
  }
`;

export const FormInput = styled.input`
  ${formControlStyles}
`;

export const FormSelect = styled.select`
  ${formControlStyles}
`;

export const CategoryModeButton = styled.button`
  justify-self: start;
  padding: 2px 0;
  border: 0;
  background: transparent;
  color: var(--brand-green);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--brand-green);
    outline-offset: 3px;
  }
`;

export const CategoryStatus = styled.p`
  margin: 0;
  color: var(--gray-muted);
  font-size: 13px;
  line-height: 1.45;

  button {
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--brand-green);
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }
`;

export const FormSectionTitle = styled.h3`
  margin: 0 0 -8px;
  padding-top: 2px;
  color: var(--brand-gray);
  font-size: 16px;
  font-weight: 600;
`;

export const FormStatus = styled.p`
  margin: 0;
  color: var(--brand-gray);
  font-size: 14px;
  line-height: 1.5;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  @media (max-width: 520px) {
    position: sticky;
    bottom: -24px;
    padding: 12px 0 0;
    background: var(--surface);
  }
`;

export const SubmitButton = styled.button`
  min-height: 46px;
  padding: 0 20px;
  border: 1px solid var(--brand-green);
  border-radius: 14px;
  background: var(--brand-green);
  color: var(--surface-white);
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  &:focus-visible {
    outline: 3px solid var(--brand-green);
    outline-offset: 3px;
  }
  &:disabled {
    opacity: 0.65;
    cursor: wait;
  }

`;
