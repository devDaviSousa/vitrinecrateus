import { CompanyCard } from '../CompanyCard/CompanyCard.jsx';
import { EmptyState, Grid } from './CompanyGrid.styles.js';

export function CompanyGrid({ companies }) {
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
