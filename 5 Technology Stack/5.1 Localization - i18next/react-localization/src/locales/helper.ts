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
      bP = import(/* webpackChunkName: 'en-US-strings' */ './resources/en-US/translation.json');
      break;
    case 'af-ZA':
      bP = import(/* webpackChunkName: 'af-ZA-strings' */ './resources/af-ZA/translation.json');
      break;
    case 'ar-EG':
      bP = import(/* webpackChunkName: 'ar-EG-strings' */ './resources/ar-EG/translation.json');
      break;
    case 'ar-LY':
      bP = import(/* webpackChunkName: 'ar-LY-strings' */ './resources/ar-LY/translation.json');
      break;
    case 'ar-SA':
      bP = import(/* webpackChunkName: 'ar-SA-strings' */ './resources/ar-SA/translation.json');
      break;
    case 'bg-BG':
      bP = import(/* webpackChunkName: 'bg-BG-strings' */ './resources/bg-BG/translation.json');
      break;
    case 'bn-BD':
      bP = import(/* webpackChunkName: 'bn-BD-strings' */ './resources/bn-BD/translation.json');
      break;
    case 'bn-IN':
      bP = import(/* webpackChunkName: 'bn-IN-strings' */ './resources/bn-IN/translation.json');
      break;
    case 'bs-Latn-BA':
      bP = import(
        /* webpackChunkName: 'bs-Latn-BA-strings' */ './resources/bs-Latn-BA/translation.json'
      );
      break;
    case 'ca-AD':
      bP = import(/* webpackChunkName: 'ca-AD-strings' */ './resources/ca-AD/translation.json');
      break;
    case 'cs-CZ':
      bP = import(/* webpackChunkName: 'cs-CZ-strings' */ './resources/cs-CZ/translation.json');
      break;
    case 'cy-GB':
      bP = import(/* webpackChunkName: 'cy-GB-strings' */ './resources/cy-GB/translation.json');
      break;
    case 'da-DK':
      bP = import(/* webpackChunkName: 'da-DK-strings' */ './resources/da-DK/translation.json');
      break;
    case 'de-AT':
      bP = import(/* webpackChunkName: 'de-AT-strings' */ './resources/de-AT/translation.json');
      break;
    case 'de-CH':
      bP = import(/* webpackChunkName: 'de-CH-strings' */ './resources/de-CH/translation.json');
      break;
    case 'de-DE':
      bP = import(/* webpackChunkName: 'de-DE-strings' */ './resources/de-DE/translation.json');
      break;
    case 'el-GR':
      bP = import(/* webpackChunkName: 'el-GR-strings' */ './resources/el-GR/translation.json');
      break;
    case 'en-AU':
      bP = import(/* webpackChunkName: 'en-AU-strings' */ './resources/en-AU/translation.json');
      break;
    case 'en-CA':
      bP = import(/* webpackChunkName: 'en-CA-strings' */ './resources/en-CA/translation.json');
      break;
    case 'en-GB':
      bP = import(/* webpackChunkName: 'en-GB-strings' */ './resources/en-GB/translation.json');
      break;
    case 'en-NZ':
      bP = import(/* webpackChunkName: 'en-NZ-strings' */ './resources/en-NZ/translation.json');
      break;
    case 'es-AR':
      bP = import(/* webpackChunkName: 'es-AR-strings' */ './resources/es-AR/translation.json');
      break;
    case 'es-BO':
      bP = import(/* webpackChunkName: 'es-BO-strings' */ './resources/es-BO/translation.json');
      break;
    case 'es-CL':
      bP = import(/* webpackChunkName: 'es-CL-strings' */ './resources/es-CL/translation.json');
      break;
    case 'es-CO':
      bP = import(/* webpackChunkName: 'es-CO-strings' */ './resources/es-CO/translation.json');
      break;
    case 'es-CR':
      bP = import(/* webpackChunkName: 'es-CR-strings' */ './resources/es-CR/translation.json');
      break;
    case 'es-DO':
      bP = import(/* webpackChunkName: 'es-DO-strings' */ './resources/es-DO/translation.json');
      break;
    case 'es-EC':
      bP = import(/* webpackChunkName: 'es-EC-strings' */ './resources/es-EC/translation.json');
      break;
    case 'es-ES':
      bP = import(/* webpackChunkName: 'es-ES-strings' */ './resources/es-ES/translation.json');
      break;
    case 'es-GT':
      bP = import(/* webpackChunkName: 'es-GT-strings' */ './resources/es-GT/translation.json');
      break;
    case 'es-HN':
      bP = import(/* webpackChunkName: 'es-HN-strings' */ './resources/es-HN/translation.json');
      break;
    case 'es-MX':
      bP = import(/* webpackChunkName: 'es-MX-strings' */ './resources/es-MX/translation.json');
      break;
    case 'es-NI':
      bP = import(/* webpackChunkName: 'es-NI-strings' */ './resources/es-NI/translation.json');
      break;
    case 'es-PA':
      bP = import(/* webpackChunkName: 'es-PA-strings' */ './resources/es-PA/translation.json');
      break;
    case 'es-PE':
      bP = import(/* webpackChunkName: 'es-PE-strings' */ './resources/es-PE/translation.json');
      break;
    case 'es-PR':
      bP = import(/* webpackChunkName: 'es-PR-strings' */ './resources/es-PR/translation.json');
      break;
    case 'es-UY':
      bP = import(/* webpackChunkName: 'es-UY-strings' */ './resources/es-UY/translation.json');
      break;
    case 'es-VE':
      bP = import(/* webpackChunkName: 'es-VE-strings' */ './resources/es-VE/translation.json');
      break;
    case 'et-EE':
      bP = import(/* webpackChunkName: 'et-EE-strings' */ './resources/et-EE/translation.json');
      break;
    case 'fa-IR':
      bP = import(/* webpackChunkName: 'fa-IR-strings' */ './resources/fa-IR/translation.json');
      break;
    case 'fi-FI':
      bP = import(/* webpackChunkName: 'fi-FI-strings' */ './resources/fi-FI/translation.json');
      break;
    case 'fil-PH':
      bP = import(/* webpackChunkName: 'fil-PH-strings' */ './resources/fil-PH/translation.json');
      break;
    case 'fr-BE':
      bP = import(/* webpackChunkName: 'fr-BE-strings' */ './resources/fr-BE/translation.json');
      break;
    case 'fr-CA':
      bP = import(/* webpackChunkName: 'fr-CA-strings' */ './resources/fr-CA/translation.json');
      break;
    case 'fr-CH':
      bP = import(/* webpackChunkName: 'fr-CH-strings' */ './resources/fr-CH/translation.json');
      break;
    case 'fr-DZ':
      bP = import(/* webpackChunkName: 'fr-DZ-strings' */ './resources/fr-DZ/translation.json');
      break;
    case 'fr-FR':
      bP = import(/* webpackChunkName: 'fr-FR-strings' */ './resources/fr-FR/translation.json');
      break;
    case 'fr-MA':
      bP = import(/* webpackChunkName: 'fr-MA-strings' */ './resources/fr-MA/translation.json');
      break;
    case 'fr-PF':
      bP = import(/* webpackChunkName: 'fr-PF-strings' */ './resources/fr-PF/translation.json');
      break;
    case 'fr-TN':
      bP = import(/* webpackChunkName: 'fr-TN-strings' */ './resources/fr-TN/translation.json');
      break;
    case 'he-IL':
      bP = import(/* webpackChunkName: 'he-IL-strings' */ './resources/he-IL/translation.json');
      break;
    case 'hi-IN':
      bP = import(/* webpackChunkName: 'hi-IN-strings' */ './resources/hi-IN/translation.json');
      break;
    case 'hr-HR':
      bP = import(/* webpackChunkName: 'hr-HR-strings' */ './resources/hr-HR/translation.json');
      break;
    case 'hu-HU':
      bP = import(/* webpackChunkName: 'hu-HU-strings' */ './resources/hu-HU/translation.json');
      break;
    case 'id-ID':
      bP = import(/* webpackChunkName: 'id-ID-strings' */ './resources/id-ID/translation.json');
      break;
    case 'is-IS':
      bP = import(/* webpackChunkName: 'is-IS-strings' */ './resources/is-IS/translation.json');
      break;
    case 'it-IT':
      bP = import(/* webpackChunkName: 'it-IT-strings' */ './resources/it-IT/translation.json');
      break;
    case 'ja-JP':
      bP = import(/* webpackChunkName: 'ja-JP-strings' */ './resources/ja-JP/translation.json');
      break;
    case 'ko-KR':
      bP = import(/* webpackChunkName: 'ko-KR-strings' */ './resources/ko-KR/translation.json');
      break;
    case 'lt-LT':
      bP = import(/* webpackChunkName: 'lt-LT-strings' */ './resources/lt-LT/translation.json');
      break;
    case 'lv-LV':
      bP = import(/* webpackChunkName: 'lv-LV-strings' */ './resources/lv-LV/translation.json');
      break;
    case 'mg-MG':
      bP = import(/* webpackChunkName: 'mg-MG-strings' */ './resources/mg-MG/translation.json');
      break;
    case 'ms-MY':
      bP = import(/* webpackChunkName: 'ms-MY-strings' */ './resources/ms-MY/translation.json');
      break;
    case 'mt-MT':
      bP = import(/* webpackChunkName: 'mt-MT-strings' */ './resources/mt-MT/translation.json');
      break;
    case 'nb-NO':
      bP = import(/* webpackChunkName: 'nb-NO-strings' */ './resources/nb-NO/translation.json');
      break;
    case 'nl-BE':
      bP = import(/* webpackChunkName: 'nl-BE-strings' */ './resources/nl-BE/translation.json');
      break;
    case 'nl-NL':
      bP = import(/* webpackChunkName: 'nl-NL-strings' */ './resources/nl-NL/translation.json');
      break;
    case 'pl-PL':
      bP = import(/* webpackChunkName: 'pl-PL-strings' */ './resources/pl-PL/translation.json');
      break;
    case 'pt-BR':
      bP = import(/* webpackChunkName: 'pt-BR-strings' */ './resources/pt-BR/translation.json');
      break;
    case 'pt-PT':
      bP = import(/* webpackChunkName: 'pt-PT-strings' */ './resources/pt-PT/translation.json');
      break;
    case 'ro-RO':
      bP = import(/* webpackChunkName: 'ro-RO-strings' */ './resources/ro-RO/translation.json');
      break;
    case 'ru-RU':
      bP = import(/* webpackChunkName: 'ru-RU-strings' */ './resources/ru-RU/translation.json');
      break;
    case 'si-LK':
      bP = import(/* webpackChunkName: 'si-LK-strings' */ './resources/si-LK/translation.json');
      break;
    case 'sk-SK':
      bP = import(/* webpackChunkName: 'sk-SK-strings' */ './resources/sk-SK/translation.json');
      break;
    case 'sl-SI':
      bP = import(/* webpackChunkName: 'sl-SI-strings' */ './resources/sl-SI/translation.json');
      break;
    case 'sr_Latn_RS':
      bP = import(
        /* webpackChunkName: 'sr_Latn_RS-strings' */ './resources/sr_Latn_RS/translation.json'
      );
      break;
    case 'sv-SE':
      bP = import(/* webpackChunkName: 'sv-SE-strings' */ './resources/sv-SE/translation.json');
      break;
    case 'sw-TZ':
      bP = import(/* webpackChunkName: 'sw-TZ-strings' */ './resources/sw-TZ/translation.json');
      break;
    case 'ta-IN':
      bP = import(/* webpackChunkName: 'ta-IN-strings' */ './resources/ta-IN/translation.json');
      break;
    case 'te-IN':
      bP = import(/* webpackChunkName: 'te-IN-strings' */ './resources/te-IN/translation.json');
      break;
    case 'th-TH':
      bP = import(/* webpackChunkName: 'th-TH-strings' */ './resources/th-TH/translation.json');
      break;
    case 'to-TO':
      bP = import(/* webpackChunkName: 'to-TO-strings' */ './resources/to-TO/translation.json');
      break;
    case 'tr-TR':
      bP = import(/* webpackChunkName: 'tr-TR-strings' */ './resources/tr-TR/translation.json');
      break;
    case 'uk-UA':
      bP = import(/* webpackChunkName: 'uk-UA-strings' */ './resources/uk-UA/translation.json');
      break;
    case 'ur-IN':
      bP = import(/* webpackChunkName: 'ur-IN-strings' */ './resources/ur-IN/translation.json');
      break;
    case 'vi-VN':
      bP = import(/* webpackChunkName: 'vi-VN-strings' */ './resources/vi-VN/translation.json');
      break;
    case 'zh-CN':
      bP = import(/* webpackChunkName: 'zh-CN-strings' */ './resources/zh-CN/translation.json');
      break;
    case 'zh-HK':
      bP = import(/* webpackChunkName: 'zh-HK-strings' */ './resources/zh-HK/translation.json');
      break;
    case 'zh-TW':
      bP = import(/* webpackChunkName: 'zh-TW-strings' */ './resources/zh-TW/translation.json');
      break;

    default:
      bP = import(/* webpackChunkName: "en-US-strings" */ './resources/en-US/translation.json');
  }

  const strings = (await bP).default;
  instance.addResourceBundle(locale, namespace, strings);
}
