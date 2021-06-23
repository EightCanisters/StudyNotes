// eslint-disable-next-line
/// <reference path="./react-app-env.d.ts" />

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppContext } from './utils/AppContext';
import { Localization, LanguageKeys, ICultureItem } from './locales/localization';

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    // appContext: AppContext;
    appContext: Localization;
  }
}

//  Initialize AppContext
// const appContext = new AppContext();
// window.appContext = appContext;
// appContext.initializeAsync();
const appContext = new Localization();
window.appContext = appContext;
appContext.initializeAsync();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
