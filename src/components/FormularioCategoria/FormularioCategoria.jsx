import { useState } from 'react';
import { createCategoriaDeServico } from '../../services/servicosService.js';
import {
  FormActions,
  FormField,
  FormInput,
  FormLabel,
  FormStatus,
  FormularioServicoContainer,
  SubmitButton,
} from '../FormularioServico/FormularioServico.styles.js';

function normalizeCategoryName(value) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/\s+/g, ' ')
    .trim();
}

function getErrorMessage(error) {
  const responseMessage = error.response?.data?.message;
  if (typeof responseMessage === 'string') return responseMessage;
  if (typeof error.message === 'string') return error.message;
  return 'Tente novamente em instantes.';
}

export function FormularioCategoria({ categories, isLoading, error, onRetry, onCreated }) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoryName = name.trim();
    if (!categoryName || isLoading || error || isSubmitting) return;

    const normalizedName = normalizeCategoryName(categoryName);
    const alreadyExists = categories.some(
      (category) => typeof category?.nome === 'string'
        && normalizeCategoryName(category.nome) === normalizedName,
    );
    if (alreadyExists) {
      setSubmitError('Já existe uma categoria com esse nome.');
      setIsCreated(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setIsCreated(false);
    try {
      await createCategoriaDeServico({ nome: categoryName });
      setName('');
      setIsCreated(true);
      onCreated?.();
    } catch (requestError) {
      setSubmitError(getErrorMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormularioServicoContainer onSubmit={handleSubmit}>
      <FormField>
        <FormLabel htmlFor="admin-categoria-nome">Nome da nova categoria</FormLabel>
        <FormInput
          id="admin-categoria-nome"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setSubmitError('');
            setIsCreated(false);
          }}
          placeholder="Ex.: Gamer"
          maxLength={80}
          required
          disabled={isLoading || Boolean(error) || isSubmitting}
        />
      </FormField>

      {isLoading && <FormStatus role="status">Carregando categorias...</FormStatus>}
      {error && (
        <FormStatus role="alert">
          Não foi possível verificar as categorias. {getErrorMessage(error)}{' '}
          <button type="button" onClick={onRetry}>Tentar novamente</button>
        </FormStatus>
      )}
      {submitError && <FormStatus role="alert">{submitError}</FormStatus>}
      {isCreated && <FormStatus role="status">Categoria cadastrada com sucesso.</FormStatus>}

      <FormActions>
        <SubmitButton
          type="submit"
          disabled={!name.trim() || isLoading || Boolean(error) || isSubmitting}
        >
          {isSubmitting ? 'Adicionando...' : 'Criar categoria'}
        </SubmitButton>
      </FormActions>
    </FormularioServicoContainer>
  );
}
