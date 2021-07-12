## 前言
最近在做的RN项目中，涉及到了多语言。所以写了这篇文章，权当做一个记录。。。<br />本文分为三块，对应有三个demo：

1. React + [i18next](https://www.i18next.com/)<br />使用react class写法。
1. React + [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)<br />使用react class写法。
1. React Native + [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) + [react-native-localize](https://github.com/zoontek/react-native-localize)<br />react-native-localize：用于桥接RN App和手机，获取手机系统的语言；<br />此demo将根据手机系统的语言设置进行切换。

1, 2的[示例代码](https://github.com/preciousonly/Demos/tree/main/localization/localization-react)；3的[示例代码](https://github.com/preciousonly/Demos/tree/main/localization/localizationRN)。

#### 效果图1，2：
![动画.gif](https://cdn.nlark.com/yuque/0/2021/gif/5380242/1624778376216-fa512b90-77e0-498d-94df-ab42bd979c34.gif#align=left&display=inline&height=607&margin=%5Bobject%20Object%5D&name=%E5%8A%A8%E7%94%BB.gif&originHeight=808&originWidth=582&size=178332&status=done&style=shadow&width=437)<br />Tip: 这里有一个可能造成困惑的地方：运行起来后，切换示例一中的语言，示例二也会随之改变。是因为两个示例使用的同一个Localization实例，其实这不是一个bug，忽略就好。

## React + [i18next](https://www.i18next.com/)
#### 1. 安装 i18next
```bash
npm install i18next --save
```
#### 2. 代码部分

- 将本地化的功能放到一个class文件中: `src\locales\localization\index.ts`
```typescript
import i18next, { i18n } from 'i18next';
import { loadResourceBundleAsync } from './helper';
import { supportedCultures } from './supportedCultures';
import en from '../resources/en-US/translation.json';
import type { SupportedCulturesType } from './supportedCultures';
import { initReactI18next } from 'react-i18next';

// #region variables and type definitions
const translationNamespace = 'translation';
export type StringResources = typeof en;
export type LanguageKeys = keyof StringResources;
export const defaultLanguage = 'en-US';

export interface ICultureItem {
  name: string;
  description: string;
  resourceCenterCode: string;
  englishDescription: string;
}

export class Localization {
  constructor(){
    this.getString = this.getString.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.getCurrentLocale = this.getCurrentLocale.bind(this);
    this.getSupportedCultures = this.getSupportedCultures.bind(this);
  }

  public readonly i18nextInstance: i18n = i18next.createInstance();

  public async initializeAsync(): Promise<void> {
    await this.i18nextInstance
      .use(initReactI18next)

      /*
       * detect user language
       * learn more: https://github.com/i18next/i18next-browser-languageDetector
       */

          //  .use(LanguageDetector)

      /*
       * init i18next
       * for all options read: https://www.i18next.com/overview/configuration-options
       */
      .init({
        lng: defaultLanguage,
        fallbackLng: defaultLanguage,
        debug: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test',
        ns: [translationNamespace],
        defaultNS: translationNamespace,
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
      });

    /*
     * Load default language ('en-US')
     * We need it even if it's not the selected language so that we have
     * a fallback for missing strings
     */
    Object.keys(this.getSupportedCultures()).forEach(async (language) => {
      await loadResourceBundleAsync(this.i18nextInstance, language, translationNamespace);
    })

    // eslint-disable-next-line multiline-comment-style
    // load current language. This will be used only if we have LanguageDetector that detects the
    // language and overrides `lng`

    /*
     *if (this.getCurrentLocale() !== defaultLanguage) {
     *  await loadResourceBundleAsync(
     *    this.i18nextInstance,
     *    this.getCurrentLocale(),
     *    translationNamespace,
     *  );
     *}
     */
  }

  public getString(key: LanguageKeys): string {
    return this.i18nextInstance.t(key);
  }

  public async changeLanguage(locale: string): Promise<void> {
    if (!supportedCultures[locale]) {
      const errorMessage = `can't find locale ${locale} in the list of supported locales`;
      throw new Error(errorMessage);
    }

    // Downloading bundle if it's not already in place
    if (!this.i18nextInstance.hasResourceBundle(locale, translationNamespace)) {
      await loadResourceBundleAsync(this.i18nextInstance, locale, translationNamespace);
    }

    this.i18nextInstance.changeLanguage(locale, error => {
      if (error) {
        console.error(error);
      }
    });
  }

  public getSupportedCultures(): Record<string, ICultureItem> {
    return supportedCultures;
  }

  public getCurrentLocale(): string {
    return this.i18nextInstance.language;
  }
}
```

- 使用`React context`将上面的`Localization`实例放到react中去，供全局使用：`src\locales\localeContext`
```typescript
// 1. 创建context - src\locales\localeContext\index.ts
import { createContext } from "react";
import { Localization } from "../localization";

export const LocalContext = createContext<Localization>({} as Localization);

// 2. Provider - src\locales\localeContext\localeProvider.tsx
import React from "react";
import { LocalContext } from ".";
import { Localization } from "../localization";

interface ILocalizationProvider {
    readonly locale: Localization;
    readonly children?: React.ReactNode;
}
export class LocalizationProvider extends React.Component<ILocalizationProvider> {

    render() {
        return (
            <LocalContext.Provider value={this.props.locale}>
                {this.props.children}
            </LocalContext.Provider>
        )

    }
}
```

- 在项目最外层实例化`Locaization`，并初始化：`src\index.tsx`
```typescript
const localization = new Localization();
localization.initializeAsync().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <LocalizationProvider locale={localization}>
        <>
          <App />
          <AppUsingReactI18next />
        </>
      </LocalizationProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});
```

- 组件中应用：`src\App.tsx`
```typescript
import React from 'react';
import cat from './imgs/cat.jpg';
import './App.css';
import { LocalContext } from './locales/localeContext';
import { SupportedCulturesType } from './locales/localization/supportedCultures';

interface IAppState {
  currLanguage: string,
  supportedCultures: SupportedCulturesType,
}

class App extends React.Component<any, IAppState, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currLanguage: 'en-US',
      supportedCultures: {}
    } 
  }

  async componentDidMount() {
    const cultures = await this.context.loadSupportedCultures()
    this.setState({
      supportedCultures: cultures
    })
  }

  switchLanguage = (): void => {
    const { changeLanguage, getCurrentLocale } = this.context;
    const nextLocale = getCurrentLocale() === 'en-US' ? 'zh-CN' : 'en-US';
    changeLanguage(nextLocale).then(
      () => this.setState({currLanguage: nextLocale})
    );
  };

  render(){
    const { getString } = this.context;
    return (
      <>
        <h1>示例1：使用i18next</h1>
        <div className="App">
          <h2>{getString('App-currLocale') + this.state.supportedCultures[this.state.currLanguage]?.name}</h2>
          <button onClick={this.switchLanguage}>{getString('App-switch')}</button>
          <div>
            <img src={cat} className="App-logo" alt="cat" />
            <div>{getString('App-myCat')}</div>
          </div>
        </div>
      </>
    )}
  }

App.contextType = LocalContext;
export default App;
```
## React + [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)
#### 1. 安装 i18next + react-i18next
```bash
npm install react-i18next i18next --save
```
#### 2. 代码部分

- 在`src\locales\localization\index.ts`中添加下图代码 ，其余保持一致；

![image.png](https://cdn.nlark.com/yuque/0/2021/png/5380242/1624779718870-048ff593-b0b0-4a7b-80d8-0ae05e6e483f.png#align=left&display=inline&height=84&margin=%5Bobject%20Object%5D&name=image.png&originHeight=84&originWidth=417&size=6906&status=done&style=none&width=417)

- 不需要自己创建context；
- 组件中应用：`src\AppUsingReactI18next.tsx`
```typescript
import React from 'react';
import cat from './imgs/cat.jpg';
import './App.css';
import { supportedCultures, SupportedCulturesType } from './locales/localization/supportedCultures';
import { withTranslation } from 'react-i18next';

interface IAppUsingReactI18nextState {
  supportedCultures: SupportedCulturesType,
}

class AppUsingReactI18next extends React.Component<any, IAppUsingReactI18nextState, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      supportedCultures: supportedCultures
    } 
  }

  switchLanguage = (): void => {
    const { i18n } = this.props;
    const nextLocale = i18n.language === 'en-US' ? 'zh-CN' : 'en-US';
    i18n.changeLanguage(nextLocale);
  };

  render(){
    const { t, i18n } = this.props; 
      return (
        <>
          <h1>示例2：使用 i18next + react-i18next</h1>
          <div className="App">
            <h2>{t('App-currLocale') + this.state.supportedCultures[i18n.language]?.name}</h2>
            <button onClick={this.switchLanguage}>{t('App-switch')}</button>
            <div>
              <img src={cat} className="App-logo" alt="cat" />
              <div>{t('App-myCat')}</div>
            </div>
          </div>
        </>
      )}
  }

export default withTranslation()(AppUsingReactI18next);
```


## React Native + [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) + [react-native-localize](https://github.com/zoontek/react-native-localize)
做法与上面差不多，需要增加的就是使用`react-native-localize`拿到手机系统设置的语言，配置到`i18next`中去。
#### 1. 安装 i18next + react-i18next - react-native-localize
```bash
npm install react-i18next i18next react-native-localize --save
```
#### 2. 代码部分

- 更新`src\locales\localization\index.ts`，组件中使用与 React + [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) 基本一致。
```typescript
import i18next, { i18n } from 'i18next';
import { loadResourceBundleAsync } from './helper';
import { supportedCultures } from './supportedCultures';
import en from '../resources/en-US/translation.json';
import * as RNLocalize from 'react-native-localize';
import { initReactI18next } from 'react-i18next';

// #region variables and type definitions
const translationNamespace = 'translation';
export type StringResources = typeof en;
export type LanguageKeys = keyof StringResources;
export const defaultLanguage = 'en-US';

export interface ICultureItem {
  name: string;
  description: string;
  resourceCenterCode: string;
  englishDescription: string;
}

export const getPhoneLocale = (): string => {
  const getCulture = (): string => {
    return RNLocalize.getLocales()[0].scriptCode
      ? `${RNLocalize.getLocales()[0].languageCode}-${RNLocalize.getLocales()[0].countryCode}`
      : defaultLanguage;
  };
  const culture = RNLocalize.getLocales()[0].languageTag;
  return supportedCultures[culture] ? culture : getCulture();
};

export class Localization {
  constructor(){
    this.getString = this.getString.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.getCurrentLocale = this.getCurrentLocale.bind(this);
    this.getSupportedCultures = this.getSupportedCultures.bind(this);
    this.onChangeLanguage();
  }

  private onChangeLanguage(): void {
    RNLocalize.addEventListener('change', () => {
      const locale = getPhoneLocale();
      this.i18nextInstance.changeLanguage(locale);
      this.changeLanguage(locale);
    });
  }

  public readonly i18nextInstance: i18n = i18next.createInstance();

  public async initializeAsync(): Promise<void> {
    await this.i18nextInstance
      .use(initReactI18next)
      .init({
        lng: defaultLanguage,
        fallbackLng: defaultLanguage,
        ns: [translationNamespace],
        defaultNS: translationNamespace,
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
      });
    await loadResourceBundleAsync(this.i18nextInstance, defaultLanguage, translationNamespace);
  }

  public getString(key: LanguageKeys): string {
    return this.i18nextInstance.t(key);
  }

  public async changeLanguage(locale: string): Promise<void> {
    if (!supportedCultures[locale]) {
      const errorMessage = `can't find locale ${locale} in the list of supported locales`;
      throw new Error(errorMessage);
    }

    // Downloading bundle if it's not already in place
    if (!this.i18nextInstance.hasResourceBundle(locale, translationNamespace)) {
      await loadResourceBundleAsync(this.i18nextInstance, locale, translationNamespace);
    }

    this.i18nextInstance.changeLanguage(locale, error => {
      if (error) {
        console.error(error);
      }
    });
  }

  public getSupportedCultures(): Record<string, ICultureItem> {
    return supportedCultures;
  }

  public getCurrentLocale(): string {
    return this.i18nextInstance.language;
  }
}


```


