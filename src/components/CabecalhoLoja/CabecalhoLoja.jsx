import { Icon } from '../Icon/Icon.jsx';
import { AccountAccess } from '../AccountAccess/AccountAccess.jsx';
import { BackLink, HeaderTitle, StoreHeader } from './CabecalhoLoja.styles.js';

export function CabecalhoLoja({ backHref = '/' }) {
  return (
    <StoreHeader>
      <BackLink href={backHref} aria-label="Voltar para a página inicial">
        <Icon name="chevronDown" size={28} />
      </BackLink>
      <HeaderTitle>Informações da loja</HeaderTitle>
      <AccountAccess />
    </StoreHeader>
  );
}
