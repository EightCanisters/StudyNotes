import { Localization } from '../localization';

describe('Localization', () => {
  it('constructor should not throw', async () => {
    expect(() => new Localization()).not.toThrow();
  });

  it('should instantiate Localization', async () => {
    await expect(async () => await new Localization().initializeAsync()).not.toThrow();
  });

  it('loads default bundle', async () => {
    const localization = new Localization();
    await localization.initializeAsync();

    // Check if we have the en-US bundle loaded
    // eslint-disable-next-line
    expect((localization as any).i18nextInstance.hasResourceBundle('en-US', 'translation')).toBe(
      true,
    );
  });

  it('has strings retrievable', async () => {
    const localization = new Localization();
    await localization.initializeAsync();

    const localizedString = localization.getString('Main-Assessments');
    // Gets the English translation as it's the fallback/default
    expect(localizedString).toBe('Assessments');
  });

  it('can change language', async () => {
    const localization = new Localization();
    await localization.initializeAsync();

    let localizedString = localization.getString('AdviseMe-CaseId');
    // Gets the English translation as it's the fallback/default
    expect(localizedString).toBe('Case ID');

    await localization.changeLocale('ro-RO');

    // eslint-disable-next-line
    expect(localization.getCurrentLocale()).toBe('ro-RO');
    localizedString = localization.getString('AdviseMe-CaseId');
    // Gets the Romanian translation
    expect(localizedString).toBe('ID Caz');
  });

  it('exposes all the supported cultures', async () => {
    const localization = new Localization();
    await localization.initializeAsync();

    const supportedCultures = localization.getSupportedCultures();
    expect(supportedCultures).toBeDefined();
    expect(Object.keys(supportedCultures).length).toBe(89);
  });

  it('throws when the locale is not present', async () => {
    expect.assertions(1);

    const localization = new Localization();
    await localization.initializeAsync();
    const bsLocale = 'some-BS-Locale';

    await expect(localization.changeLocale(bsLocale)).rejects.toThrow();
  });
});
