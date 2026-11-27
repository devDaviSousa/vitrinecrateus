# Vitrine Crateús

> Um catálogo leve e responsivo para descobrir empresas e serviços de Crateús, CE.

Encontre uma categoria, pesquise por nome ou cidade e abra o Instagram da empresa escolhida. A interface foi pensada primeiro para smartphones, com cards visuais, navegação por categorias e tema noturno.

## ✨ O que o projeto oferece

- **Busca rápida:** filtra empresas por nome, categoria ou cidade, sem diferenciar acentos ou maiúsculas.
- **Categorias com ícones:** navegue pelo carrossel usando toque, arraste com o mouse ou os botões de navegação.
- **Resultados progressivos:** a página mostra 24 empresas por vez e permite carregar mais resultados.
- **Cards de empresa:** exibem imagem, categoria, nome, localização e resumo de avaliações. A imagem e o botão abrem a página da loja selecionada; o resumo abre um diálogo com as avaliações.
- **Tema claro e noturno:** alterne pelo botão no cabeçalho; a preferência fica salva no navegador.
- **Layout responsivo:** grade de cards e controles se adaptam a celulares, tablets e telas maiores.
- **Acessibilidade básica:** controles possuem rótulos acessíveis e estados de foco visíveis.

## 🧰 Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React 18 | Componentes e estado da interface |
| Vite 6 | Desenvolvimento local e build |
| Axios | Comunicação com a API REST |
| styled-components | Estilos isolados por componente e tokens globais |
| JavaScript (ES modules) | Dados e lógica da aplicação |

## 🚀 Comece a usar

### Pré-requisitos

- Node.js 18 ou superior
- npm

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O Vite mostra no terminal o endereço local para abrir no navegador.

### API de serviços

Crie um arquivo `.env` na raiz usando `.env.example` como referência:

```env
VITE_API_BASE_URL=http://localhost:3333
```

A tela inicial consulta `GET /servicos`. O hook `useServicos` controla os dados, o carregamento, os erros e a função `refetch`; o `CompanyGrid` apresenta os resultados e permite tentar novamente quando a chamada falha.

Se o navegador bloquear a chamada por CORS quando o front-end e a API usam portas diferentes, habilite CORS na API para permitir a origem do Vite (por padrão, `http://localhost:5173`). Em uma API Express, por exemplo, configure o middleware CORS no servidor antes das rotas:

```js
app.use(cors({ origin: 'http://localhost:5173' }));
```

Se necessário, instale e importe o pacote `cors` no projeto da API. Em desenvolvimento, também é possível configurar um proxy no `vite.config.js`. CORS deve ser configurado no servidor da API ou no proxy de desenvolvimento, não com cabeçalhos adicionados pelo front-end.

### Build de produção

```bash
npm run build
```

### Pré-visualizar o build

```bash
npm run preview
```

### Publicar no Netlify

O arquivo `public/_redirects` encaminha rotas da aplicação, como `/paginaLoja?companyId=1`, para o `index.html`. Assim, o React consegue abrir a loja selecionada mesmo ao acessar ou atualizar essa URL diretamente. Configure `VITE_API_BASE_URL` no ambiente de build para apontar para a API publicada.

## 🗂️ Estrutura do projeto

```text
src/
├── App.jsx
├── main.jsx
├── assets/
│   ├── icons/                 # Cada ícone SVG em sua própria pasta
│   └── logos/                 # Imagens locais usadas nos cards
├── components/
│   ├── CategoryCarousel/      # Carrossel e estilos das categorias
│   ├── CompanyCard/           # Card individual e estilos
│   ├── CompanyGrid/           # Grade e estado vazio
│   ├── Icon/                  # Seletor central de ícones
│   └── ThemeToggle/            # Botão para alternar o tema
├── services/
│   ├── api.js                  # Cliente Axios e URL base
│   └── servicosService.js      # Requisições de serviços
├── hooks/
│   ├── useServicos/            # Dados, carregamento, erro e refetch
│   └── useTheme/               # Estado e persistência do tema
├── data/
│   ├── companies.js            # Dados usados pela página de loja existente
│   └── paginaLoja.js           # Conteúdo estático da página de loja
├── pages/
│   └── Home/                   # Tela inicial e estilos da página
├── styles/
│   └── GlobalStyle.js          # Reset, fontes e variáveis de tema
└── utils/
    └── categoryIcons.js        # Relação entre categoria e ícone
```

Os componentes visuais ficam em pastas próprias. Quando há estilos específicos, o arquivo `.styles.js` acompanha o componente `.jsx`. A tela inicial adapta os campos de `/servicos` (`nome`, `categoriaDeServico`, `rua`, `numerodoendereco`, `bairro`, `cidade` e `logo`) ao formato usado pelos cards.

## 🏢 Dados das empresas

A tela inicial consome os serviços de `GET /servicos`. A API retorna registros neste formato:

```js
{
  id: 2,
  nome: 'Eletricista',
  categoria: 2,
  cidade: 'Crateús',
  bairro: 'Centro',
  logo: 'https://exemplo.com/logo.png',
  categoriaDeServico: { id: 2, nome: 'Açaí' }
}
```

Os dados da API são adaptados ao modelo consumido por `CompanyCard`. Uma imagem ausente ou indisponível exibe as iniciais do serviço.

## 🧭 Organização da interface

- **`Home`** prepara a busca, as categorias selecionadas e a quantidade de resultados visíveis.
- **`CategoryCarousel`** apresenta os ícones definidos em `categoryIcons.js` e notifica a página quando a seleção muda.
- **`CompanyGrid`** recebe a lista filtrada e monta um `CompanyCard` para cada empresa.
- **`CompanyCard`** direciona a imagem e o botão para a página da loja usando o ID local da empresa.
- **`useTheme`** aplica o tema no documento e guarda a escolha com a chave `vitrine-theme` no `localStorage`.
- **`GlobalStyle`** define as cores base e as variáveis para os modos claro e noturno.

## 🎨 Estilos e temas

Os estilos dos componentes são escritos com `styled-components`. As cores compartilhadas ficam em `src/styles/GlobalStyle.js` como variáveis CSS, incluindo superfícies, textos, bordas, sombras e o verde de destaque. Isso mantém os dois temas coerentes sem duplicar os estilos de cada componente.

## 📝 Scripts disponíveis

| Comando | Ação |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente o build gerado |

---

Feito para deixar os negócios de Crateús mais fáceis de encontrar. 🌿
