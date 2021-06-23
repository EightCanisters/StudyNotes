/* eslint-disable max-lines-per-function */
// import type en from './resources/en-US/translation.json';
// import type { i18n } from 'i18next';
import en from './resources/en-US/translation.json';
import { i18n } from 'i18next';
import { DeepReadonly } from '../types/core-types';

export type StringResources = typeof en;
export async function loadResourceBundleAsync(
  instance: DeepReadonly<i18n>,
  locale: string,
  namespace: string,
): Promise<void> {
  let bP: Promise<{ default: Partial<StringResources> }>;

  switch (locale) {
    case 'en-US':
      bP = import('./resources/en-US/translation.json');
      break;
    case 'zh-CN':
      bP = import('./resources/zh-CN/translation.json');
      break;

    default:
      bP = import('./resources/en-US/translation.json');
  }

  const strings = (await bP).default;
  instance.addResourceBundle(locale, namespace, strings);
}
