import * as React from 'react';
import { AppContext } from './AppContext';
import { StringResources } from '../locales/localization';
import { DeepReadonly } from '../types/core-types';

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    appContext: AppContext;
  }
}

/**
 * An abstract base class for components in ServicesHub. The class gives access to the
 * SHAppContext singleton through this.appContext, access to strings through
 * this.strings and implements a rendering error boundary with componentDidCatch.
 */
export abstract class BaseComponent<P = {}, S = {}> extends React.Component<DeepReadonly<P>, S> {
  public readonly appContext: AppContext = window.appContext;

  public getString(key: keyof StringResources): string {
    return this.appContext.getString(key);
  }

  public changeLanguage(locale: string): Promise<void> {
    return this.appContext.changeLanguage(locale);
  }

  public getLanguage(): string {
    return this.appContext.getLanguage();
  }
}
