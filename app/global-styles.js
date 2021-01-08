import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .banner {
    width: 100%;
    margin: 0 auto;
    display: block;
  }

  .label-gender {
    margin-top: 25px;
  }

  .select-gender {
    margin-top: 12px;
  }

  .datepicker-dob {
    margin-top: 0px !important;
  }

  .scan-details {
    margin-bottom: 20px !important;
  }

  .save-button {
    margin: 20px 0 !important;
  }

  .pay-button {
    height: 25px;
  }

  .MuiTypography-h6 {
    background: linear-gradient(90deg, rgba(111,188,196,1) 0%, rgba(239,238,241,1) 45%, rgba(239,238,241,1) 100%);;
    padding-left:10px;
    color: white;
    margin-bottom: 10px !important;
    border-radius: 5px;
  }

  .MuiButton-textPrimary {
    color: #666 !important;
  }
`;

export default GlobalStyle;
