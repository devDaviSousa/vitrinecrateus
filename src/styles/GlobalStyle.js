import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;
    --brand-gray: #85858B;
    --brand-green: #2f7d4a;
    --surface-white: #ffffff;
    --surface: #ffffff;
    --page-background: #ffffff;
    --page-glow: rgba(69, 71, 79, .035);
    --brand-mark: #2f7d4a;
    --gray-soft: rgba(69, 71, 79, .08);
    --gray-border: rgba(69, 71, 79, .14);
    --gray-muted: rgba(69, 71, 79, .62);
    --gray-shadow: rgba(69, 71, 79, .09);
    --card-shadow: 0 18px 50px rgba(69, 71, 79, .08), 0 2px 8px rgba(69, 71, 79, .025);
    --card-shadow-hover: 0 24px 60px rgba(69, 71, 79, .13), 0 2px 8px rgba(69, 71, 79, .025);
  }

  :root[data-theme='dark'] {
    color-scheme: dark;
    --brand-gray: #f2f3f5;
    --surface: #1d1f22;
    --page-background: #111315;
    --page-glow: rgba(255, 255, 255, .035);
    --brand-mark: #2f7d4a;
    --gray-soft: rgba(255, 255, 255, .08);
    --gray-border: rgba(255, 255, 255, .13);
    --gray-muted: #a4a8ae;
    --gray-shadow: rgba(0, 0, 0, .28);
    --card-shadow: 0 18px 50px rgba(0, 0, 0, .3), 0 2px 8px rgba(0, 0, 0, .16);
    --card-shadow-hover: 0 24px 60px rgba(0, 0, 0, .42), 0 2px 8px rgba(0, 0, 0, .2);
  }

  *, *::before, *::after { box-sizing: border-box; }

  html { min-width: 320px; background: var(--page-background); }

  body {
    margin: 0;
    color: var(--brand-gray);
    background: var(--page-background);
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 180ms ease, color 180ms ease;
  }

  button, input { font-family: inherit; }
  button { -webkit-tap-highlight-color: transparent; }
  ::selection { background: var(--brand-green); color: var(--surface-white); }
`;
