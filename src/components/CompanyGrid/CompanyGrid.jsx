import { CompanyCard } from '../CompanyCard/CompanyCard.jsx';
import { EmptyState, ErrorState, Grid, RetryButton } from './CompanyGrid.styles.js';

export function CompanyGrid({ companies, isLoading = false, error = null, onRetry }) {
  if (isLoading) {
    return <EmptyState role="status">Carregando serviços...</EmptyState>;
  }

  if (error) {
    const message = typeof error.message === 'string' ? error.message : 'Tente novamente em instantes.';

    return (
      <ErrorState role="alert">
        <p>Não foi possível carregar os serviços. {message}</p>
        {onRetry && (
          <RetryButton type="button" onClick={onRetry}>
            Tentar novamente
          </RetryButton>
        )}
      </ErrorState>
    );
  }

  if (companies.length === 0) {
    return <EmptyState>Nenhuma empresa encontrada. Tente outro nome ou categoria.</EmptyState>;
  }

  return (
    <Grid aria-label="Lista de empresas">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </Grid>
  );
}
