import { useRef, useState } from 'react';
import { createServico } from '../../services/servicosService.js';
import {
  CategoryStatus,
  FormActions,
  FormCheckbox,
  FormCheckboxRow,
  FormField,
  FormGrid,
  FormInput,
  FormLabel,
  FormSectionTitle,
  FormSelect,
  FormStatus,
  FormularioServicoContainer,
  SubmitButton,
} from './FormularioServico.styles.js';

const emptyForm = {
  nome: '',
  categoria: '',
  cidade: '',
  rua: '',
  bairro: '',
  numerodoendereco: '',
  logo: null,
  site: '',
  instagram: '',
  facebook: '',
  whatsapp: '',
  linkedin: '',
};

const MAX_LOGO_SIZE = 5 * 1024 * 1024;
const allowedLogoTypes = new Set(['image/png', 'image/jpeg', 'image/svg+xml']);

function getErrorMessage(error) {
  const responseMessage = error.response?.data?.message ?? error.response?.data?.error;
  if (typeof responseMessage === 'string') return responseMessage;
  if (typeof error.message === 'string') return error.message;
  return 'Tente novamente em instantes.';
}

export function FormularioServico({
  categories = [],
  categoriesLoading = false,
  categoriesError = null,
  onRetryCategories,
  onCreated,
}) {
  const logoInputRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [omitAddress, setOmitAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitError('');
    setIsCreated(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setIsCreated(false);

    const category = categories.find(
      (categoria) => String(categoria.id) === form.categoria,
    );

    if (!category) {
      setSubmitError('Selecione uma categoria para o serviço.');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      const fields = {
        nome: form.nome.trim(),
        categoria: String(category.id),
        cidade: omitAddress ? '' : form.cidade.trim(),
        rua: omitAddress ? '' : form.rua.trim(),
        bairro: omitAddress ? '' : form.bairro.trim(),
        numerodoendereco: omitAddress ? '' : form.numerodoendereco.trim(),
        site: form.site.trim(),
        instagram: form.instagram.trim(),
        facebook: form.facebook.trim(),
        whatsapp: form.whatsapp.trim(),
        linkedin: form.linkedin.trim(),
      };

      Object.entries(fields).forEach(([field, value]) => {
        if (value !== '') payload.append(field, value);
      });
      if (form.logo) payload.append('logo', form.logo);

      await createServico(payload);
      setForm(emptyForm);
      if (logoInputRef.current) logoInputRef.current.value = '';
      setOmitAddress(false);
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
      <FormGrid>
        <FormField>
          <FormLabel htmlFor="servico-nome">Nome do serviço</FormLabel>
          <FormInput
            id="servico-nome"
            name="nome"
            value={form.nome}
            onChange={updateField}
            placeholder="Ex.: Eletricista"
            maxLength={120}
            required
          />
        </FormField>

        <FormField>
          <FormLabel htmlFor="servico-categoria">Categoria</FormLabel>
          <FormSelect
            id="servico-categoria"
            name="categoria"
            value={form.categoria}
            onChange={updateField}
            required
            disabled={categoriesLoading || Boolean(categoriesError) || categories.length === 0}
          >
            <option value="">
              {categoriesLoading ? 'Carregando categorias...' : 'Selecione uma categoria'}
            </option>
            {categories.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </FormSelect>
          {categoriesError && (
            <CategoryStatus role="alert">
              Não foi possível carregar as categorias. {getErrorMessage(categoriesError)}{' '}
              <button type="button" onClick={onRetryCategories}>Tentar novamente</button>
            </CategoryStatus>
          )}
          {!categoriesLoading && !categoriesError && categories.length === 0 && (
            <CategoryStatus>Cadastre uma categoria antes de criar um serviço.</CategoryStatus>
          )}
        </FormField>
      </FormGrid>

      <FormSectionTitle>Endereço</FormSectionTitle>
      <FormCheckboxRow htmlFor="servico-sem-endereco">
        <FormCheckbox
          id="servico-sem-endereco"
          type="checkbox"
          checked={omitAddress}
          onChange={(event) => setOmitAddress(event.target.checked)}
        />
        Não desejo informar dados de endereço
      </FormCheckboxRow>
      <FormGrid $columns={2}>
        <FormField>
          <FormLabel htmlFor="servico-cidade">Cidade</FormLabel>
          <FormInput
            id="servico-cidade"
            name="cidade"
            value={form.cidade}
            onChange={updateField}
            autoComplete="address-level2"
            maxLength={100}
            required={!omitAddress}
            disabled={omitAddress}
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="servico-rua">Rua</FormLabel>
          <FormInput
            id="servico-rua"
            name="rua"
            value={form.rua}
            onChange={updateField}
            autoComplete="address-line1"
            maxLength={150}
            required={!omitAddress}
            disabled={omitAddress}
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="servico-bairro">Bairro</FormLabel>
          <FormInput
            id="servico-bairro"
            name="bairro"
            value={form.bairro}
            onChange={updateField}
            maxLength={100}
            required={!omitAddress}
            disabled={omitAddress}
          />
        </FormField>
        <FormField>
          <FormLabel htmlFor="servico-numero">Número</FormLabel>
          <FormInput
            id="servico-numero"
            name="numerodoendereco"
            value={form.numerodoendereco}
            onChange={updateField}
            autoComplete="address-line2"
            maxLength={20}
            required={!omitAddress}
            disabled={omitAddress}
          />
        </FormField>
      </FormGrid>

      <FormSectionTitle>Imagem e redes sociais</FormSectionTitle>
      <FormGrid>
        <FormField>
          <FormLabel htmlFor="servico-logo">Logo (opcional)</FormLabel>
          <FormInput
            id="servico-logo"
            ref={logoInputRef}
            name="logo"
            type="file"
            accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
            onChange={(event) => {
              const file = event.target.files?.[0] || null;
              if (file && !allowedLogoTypes.has(file.type)) {
                setSubmitError('Selecione uma imagem PNG, JPG ou SVG.');
                setIsCreated(false);
                event.target.value = '';
                setForm((current) => ({ ...current, logo: null }));
                return;
              }
              if (file && file.size > MAX_LOGO_SIZE) {
                setSubmitError('A imagem deve ter no máximo 5 MB.');
                setIsCreated(false);
                event.target.value = '';
                setForm((current) => ({ ...current, logo: null }));
                return;
              }
              setForm((current) => ({ ...current, logo: file }));
              setSubmitError('');
              setIsCreated(false);
            }}
          />
          <small>PNG, JPG ou SVG; tamanho máximo de 5 MB.</small>
        </FormField>
        {[
          ['site', 'Site'],
          ['instagram', 'Instagram'],
          ['facebook', 'Facebook'],
          ['whatsapp', 'WhatsApp'],
          ['linkedin', 'LinkedIn'],
        ].map(([name, label]) => (
          <FormField key={name}>
            <FormLabel htmlFor={`servico-${name}`}>{label} (opcional)</FormLabel>
            <FormInput
              id={`servico-${name}`}
              name={name}
              type={name === 'whatsapp' ? 'tel' : 'url'}
              value={form[name]}
              onChange={updateField}
              placeholder={name === 'whatsapp' ? '(88) 9 9999-9999' : 'https://'}
            />
          </FormField>
        ))}
      </FormGrid>

      {submitError && <FormStatus role="alert">{submitError}</FormStatus>}
      {isCreated && <FormStatus role="status">Serviço cadastrado com sucesso.</FormStatus>}

      <FormActions>
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Cadastrar serviço'}
        </SubmitButton>
      </FormActions>
    </FormularioServicoContainer>
  );
}
