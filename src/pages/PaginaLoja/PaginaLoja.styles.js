import styled from "styled-components";

export const StorePage = styled.main`
  min-height: 100vh;
  padding: 36px 24px;
  background:
    radial-gradient(ellipse at 50% -22%, var(--page-glow), transparent 50%),
    var(--page-background);
  font-family:
    "DM Sans",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  @media (max-width: 760px) {
    padding: 0;
  }
`;

export const PageShell = styled.div`
  width: min(100%, 1120px);
  min-height: calc(100vh - 72px);
  margin: 0 auto;
  padding: 30px 38px 42px;
  border: 1px solid var(--gray-border);
  border-radius: 28px;
  background: var(--page-background);
  box-shadow: var(--card-shadow);
  color: var(--brand-gray);
  font-family:
    "DM Sans",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  @media (max-width: 900px) and (min-width: 761px) {
    padding: 28px;
  }

  @media (max-width: 480px) {
    min-height: 100vh;
    padding: 18px 14px 30px;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }
`;

export const StoreContent = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 0.78fr) minmax(0, 1.22fr);
  grid-template-areas:
    "identity products"
    "links products";
  align-items: start;
  column-gap: 42px;
  row-gap: 28px;

  @media (max-width: 900px) and (min-width: 761px) {
    column-gap: 28px;
  }

  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "identity"
      "products"
      "links";
    gap: 0;
  }
`;

export const IdentityColumn = styled.div`
  grid-area: identity;
`;

export const ProductsColumn = styled.div`
  grid-area: products;
`;

export const LinksColumn = styled.div`
  grid-area: links;

  @media (max-width: 760px) {
    margin-top: 20px;
  }
`;
