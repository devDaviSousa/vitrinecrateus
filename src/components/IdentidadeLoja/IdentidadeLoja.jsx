import {
  StoreBanner,
  StoreCategory,
  StoreIdentityContainer,
  StoreLogo,
  StoreLogoFallback,
  StoreLocation,
  StoreName,
} from './IdentidadeLoja.styles.js';

export function IdentidadeLoja({ name, category, logo, location }) {
  const initials = name.replace(/^@/, '').slice(0, 2).toLocaleUpperCase('pt-BR');

  return (
    <StoreIdentityContainer>
      <StoreBanner>
        {logo
          ? <StoreLogo src={logo} alt={`Logo da loja ${name}`} />
          : <StoreLogoFallback aria-hidden="true">{initials}</StoreLogoFallback>}
      </StoreBanner>
      <StoreName>{name}</StoreName>
      <StoreCategory>{category}</StoreCategory>
      {location && <StoreLocation>{location}</StoreLocation>}
    </StoreIdentityContainer>
  );
}
