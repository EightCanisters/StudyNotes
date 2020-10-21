import i18next, { i18n } from 'i18next';
import { loadResourceBundleAsync } from '../helper';
import { defaultLanguage } from '../localization';
import { supportedCultures } from 'locales/supportedCultures';

let instance: i18n;

describe('Localization helper', () => {
  beforeEach(() => {
    instance = i18next.createInstance(undefined, () => {
      /* */
    });
  });

  it('loads English', async () => {
    expect(instance.hasResourceBundle(defaultLanguage, 'translation')).toBe(false);
    await loadResourceBundleAsync(instance, defaultLanguage, 'translation');
    expect(instance.hasResourceBundle(defaultLanguage, 'translation')).toBe(true);
  });

  it('loads default language if the locale is not found', async () => {
    const randomLocale = 'la-la-la-this-is-not-a-valid-locale';
    expect(instance.hasResourceBundle(randomLocale, 'translation')).toBe(false);
    await loadResourceBundleAsync(instance, randomLocale, 'translation');
    expect(instance.hasResourceBundle(randomLocale, 'translation')).toBe(true);
  });

  it('loads Romanian', async () => {
    expect(instance.hasResourceBundle('ro-RO', 'translation')).toBe(false);
    await loadResourceBundleAsync(instance, 'ro-RO', 'translation');
    expect(instance.hasResourceBundle('ro-RO', 'translation')).toBe(true);
  });

  it('test all locales doesnt fail', async () => {
    Object.keys(supportedCultures).forEach(async locale => {
      expect(instance.hasResourceBundle(locale, 'translation')).toBe(false);
      await loadResourceBundleAsync(instance, locale, 'translation');
      expect(instance.hasResourceBundle(locale, 'translation')).toBe(true);
    });
  });

  it('test line-up between locales and dynamic resource (not falling back on the default locale)', async () => {
    const keys = Object.keys(supportedCultures);

    for (let index = 0; index < keys.length; index++) {
      const locale = keys[index];

      const inst = i18next.createInstance(undefined, () => {
        /* */
      });

      expect(inst.hasResourceBundle(locale, 'translation')).toBe(false);
      await loadResourceBundleAsync(inst, locale, 'translation');
      await inst.changeLanguage(locale);
      expect(inst.hasResourceBundle(locale, 'translation')).toBe(true);

      if (!locale.startsWith('en')) {
        // If this is `Save and Continue`, it means we defaulted to English, which means we are missing the specific import
        expect(inst.t('Main-SaveAndContinue')).not.toBe('Save and Continue');
      } else {
        expect(inst.t('Main-SaveAndContinue')).toBe('Save and Continue');
      }
    }
  });
});
