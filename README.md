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

### Build de produção

```bash
npm run build
```

### Pré-visualizar o build

```bash
npm run preview
```

### Publicar no Netlify

O arquivo `public/_redirects` encaminha rotas da aplicação, como `/paginaLoja?companyId=1`, para o `index.html`. Assim, o React consegue abrir a loja selecionada mesmo ao acessar ou atualizar essa URL diretamente. Os dados das lojas são carregados localmente de `src/data/companies.js`, sem chamadas de API.

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
├── data/
│   └── companies.js           # Lista de empresas consumida pela aplicação
├── hooks/
│   └── useTheme/               # Estado e persistência do tema
├── pages/
│   └── Home/                   # Tela inicial e estilos da página
├── styles/
│   └── GlobalStyle.js          # Reset, fontes e variáveis de tema
└── utils/
    └── categoryIcons.js        # Relação entre categoria e ícone
```

Os componentes visuais ficam em pastas próprias. Quando há estilos específicos, o arquivo `.styles.js` acompanha o componente `.jsx`.

## 🏢 Dados das empresas

A tela inicial importa a constante `companies` de `src/data/companies.js`. Cada empresa segue este formato:

```js
{
  id: 1,
  nome: '@acaidailha__',
  categoria: {
    id: 1,
    nome: 'AÇAÍ',
  },
  local: 'Crateús, CE',
  imagem: imagemAcai,
  googleRating: 5.0,
  googleReviewCount: 60,
  percentualVotos: 52.2,
  empate: false,
}
```

`percentualVotos` e `empate` continuam nos dados, mas não são exibidos nos cards.
`googleRating` e `googleReviewCount` são opcionais e alimentam a nota, as estrelas e a contagem de avaliações. Sem esses campos, o card mostra “Sem avaliações”.

### Usar uma imagem local

1. Coloque o arquivo em `src/assets/logos/`.
2. Importe-o no início de `src/data/companies.js`.
3. Atribua a variável ao campo `imagem` da empresa correspondente.

```js
import imagemAcai from '../assets/logos/acaidailha__.jpg';

// No objeto da empresa:
imagem: imagemAcai,
```

O campo também pode receber uma URL de imagem pública. Imagens com erro de carregamento mostram uma alternativa com as iniciais do perfil.

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
