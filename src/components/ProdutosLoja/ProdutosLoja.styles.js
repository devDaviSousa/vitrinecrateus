import styled from 'styled-components';

export const ProductsSection = styled.section`
  margin: 0;
`;

export const ProductsTitle = styled.h2`
  margin: 0 0 16px;
  color: var(--brand-gray);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -.035em;

  @media (max-width: 760px) {
    display: none;
  }
`;

export const ProductList = styled.div`
  display: grid;
  gap: 12px;
`;

export const EmptyProducts = styled.p`
  margin: 20px 0;
  color: var(--gray-muted);
  font-size: 16px;
  text-align: center;
`;
