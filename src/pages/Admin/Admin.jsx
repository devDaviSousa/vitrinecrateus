import { FormularioCategoria } from '../../components/FormularioCategoria/FormularioCategoria.jsx';
import { FormularioServico } from '../../components/FormularioServico/FormularioServico.jsx';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle.jsx';
import { useCategoriasDeServico } from '../../hooks/useCategoriasDeServico/useCategoriasDeServico.js';
import {
  AdminContent,
  AdminDescription,
  AdminHeader,
  AdminPageShell,
  AdminSection,
  AdminSectionDescription,
  AdminSectionTitle,
  AdminTitle,
  BackToHome,
} from './Admin.styles.js';

export default function Admin({ theme, toggleTheme }) {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useCategoriasDeServico();

  return (
    <AdminPageShell>
      <AdminContent>
        <AdminHeader>
          <BackToHome href="/">Voltar para a Home</BackToHome>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </AdminHeader>

        <AdminTitle>Painel administrativo</AdminTitle>
        <AdminDescription>
          Gerencie as categorias e cadastre serviços que serão exibidos na Home.
        </AdminDescription>

        <AdminSection>
          <AdminSectionTitle>Nova categoria</AdminSectionTitle>
          <AdminSectionDescription>
            Crie uma categoria separadamente antes de associá-la a um serviço.
          </AdminSectionDescription>
          <FormularioCategoria
            categories={categories}
            isLoading={isLoading}
            error={error}
            onRetry={refetch}
            onCreated={refetch}
          />
        </AdminSection>

        <AdminSection>
          <AdminSectionTitle>Novo serviço</AdminSectionTitle>
          <AdminSectionDescription>
            O serviço cadastrado aparecerá na listagem da Home após ser salvo.
          </AdminSectionDescription>
          <FormularioServico
            categories={categories}
            categoriesLoading={isLoading}
            categoriesError={error}
            onRetryCategories={refetch}
          />
        </AdminSection>
      </AdminContent>
    </AdminPageShell>
  );
}
