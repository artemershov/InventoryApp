import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    width: 100%;
    height: 100%;
  }
  #app {
    min-height: 100%;
  }
  .btn,
  .form-control {
    border-radius: 0;
    box-shadow: none !important;
  }
  .form-control {
    border-width: 2px;
  }
  .btn-primary,
  .bg-primary {
    background-color: #359fe0;
  }
  nav.bg-primary {
    background-color: #359fe0 !important;
  }
  .btn-danger,
  .bg-danger {
    background-color: #d2000d;
  }
  .btn-primary {
    border-color: #359fe0;
  }
  .btn-danger {
    border-color: #d2000d;
  }
  .btn-link,
  a {
    color: #359fe0;
  }
  .bg-light {
    background-color: #f5f5f5 !important;
  }
`;

export default GlobalStyles;
