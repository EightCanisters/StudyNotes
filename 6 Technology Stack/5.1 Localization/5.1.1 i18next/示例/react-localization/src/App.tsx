import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

export enum Languages {
  'en-US' = 'en-US',
  'zh-CN' = 'zh-CN'
}

function App() {
  const [currLanguage, setCurrLanguage] = useState(Languages["en-US"]);

  function changeLanguage(): void {
    if(currLanguage === Languages["en-US"]) {
      window.appContext.changeLanguage(Languages["zh-CN"]).then(() => {
        setCurrLanguage(Languages["zh-CN"]);
      });
      return;
    }
    window.appContext.changeLanguage(Languages["en-US"]).then(() => {
      setCurrLanguage(Languages["en-US"]);
    });
  };

  function getString(str: any): string {
    return window.appContext.getString(str);
  }

  return (
    <div className="App">
      <h1>当前语言：{currLanguage}</h1>
      <button onClick={changeLanguage}>切换语言</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {getString('App-description')}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {getString('App-learn')}
        </a>
      </header>
    </div>
  );
}

export default App;
