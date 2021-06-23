import { Localization, LanguageKeys, ICultureItem } from '../locales/localization';

export interface IAppContext {
  initializeAsync(): Promise<void>;
  getString(key: LanguageKeys): string;
  changeLanguage(locale: string): Promise<void>;
  getLanguage(): string;
  getSupportedCultures(): any;
}

export class AppContext implements IAppContext {

  private readonly localization: Localization = new Localization();

  public async initializeAsync(): Promise<void> {
    await this.localization.initializeAsync();
  }

  public getString(key: LanguageKeys): string {
    return this.localization.getString(key);
  }

  public changeLanguage(locale: string): Promise<void> {
    return this.localization.changeLanguage(locale);
  }

  public getLanguage(): string {
    return this.localization.getCurrentLocale();
  }

  public getSupportedCultures(): Record<string, ICultureItem> {
    return this.localization.getSupportedCultures();
  }
}
