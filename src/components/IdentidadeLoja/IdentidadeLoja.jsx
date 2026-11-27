import {
  StoreBanner,
  StoreCategory,
  StoreIdentityContainer,
  StoreLogo,
  StoreName,
} from './IdentidadeLoja.styles.js';

export function IdentidadeLoja({ name, category, logo }) {
  return (
    <StoreIdentityContainer>
      <StoreBanner>
        <StoreLogo src={logo} alt={`Logo da loja ${name}`} />
      </StoreBanner>
      <StoreName>{name}</StoreName>
      <StoreCategory>{category}</StoreCategory>
    </StoreIdentityContainer>
  );
}
