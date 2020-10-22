import i18next, { i18n } from 'i18next';
import { loadResourceBundleAsync } from './helper';
import { supportedCultures } from './supportedCultures';
// import type en from './resources/en-US/translation.json';
import en from './resources/en-US/translation.json';
// import LanguageDetector from 'i18next-browser-languagedetector';// Documentation https://github.com/i18next/i18next-browser-languageDetector

// #region variables and type definitions
const translationNamespace = 'translation';
export type StringResources = typeof en;
export type LanguageKeys = keyof StringResources;
export const defaultLanguage = 'en-US';

// #endregion

export interface ICultureItem {
  name: string;
  description: string;
  resourceCenterCode: string;
  englishDescription: string;
}

export class Localization {
  private readonly i18nextInstance: i18n = i18next.createInstance();

  public async initializeAsync(): Promise<void> {
    await this.i18nextInstance
      /*
       * detect user language
       * learn more: https://github.com/i18next/i18next-browser-languageDetector
       */

      //      .use(LanguageDetector)

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
    await loadResourceBundleAsync(this.i18nextInstance, defaultLanguage, translationNamespace);

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
    console.log(this.i18nextInstance)
    return this.i18nextInstance.t(key);
  }

  public async changeLocale(locale: string): Promise<void> {
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
