export function isJson(obj: Readonly<unknown>): boolean {
  if (obj === null) {
    return false;
  }

  if (Array.isArray(obj)) {
    return false;
  }

  const t = typeof obj;

  return (
    ['boolean', 'number', 'string', 'symbol', 'function', 'undefined', 'bigint'].indexOf(t) === -1
  );
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const normalizeArray = <T>(
  array: Readonly<Array<T>>,
  indexKey: string,
): Record<string, T> => {
  const normalizedObject: Record<string, T> = {};

  if (array && indexKey) {
    for (let i = 0; i < array.length; i++) {
      const key = (array[i] as any)[indexKey];

      if (key) {
        normalizedObject[key] = array[i];
      }
    }
  }

  return normalizedObject;
};

export function updateUrlParameter(uri: string, key: string, value: string | number): string {
  // remove the hash part before operating on the uri
  const i = uri.indexOf('#');
  const hash = i === -1 ? '' : uri.substr(i);
  uri = i === -1 ? uri : uri.substr(0, i);

  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';

  if (!value) {
    // remove key-value pair if value is empty
    uri = uri.replace(new RegExp(`([?&]?)${key}=[^&]*`, 'i'), '');

    if (uri.slice(-1) === '?') {
      uri = uri.slice(0, -1);
    }

    // replace first occurrence of & by ? if no ? is present
    if (uri.indexOf('?') === -1) uri = uri.replace(/&/, '?');
  } else if (uri.match(re)) {
    uri = uri.replace(re, `$1${key}=${value}$2`);
  } else {
    uri = `${uri + separator + key}=${value}`;
  }

  return uri + hash;
}

export const removeAllWhiteSpaces = (text: undefined | string): string => {
  return text ? text.replace(/\s/g, '') : '';
};

export const arrayDeduplication = <T>(array: Readonly<Array<T>>, indexKey: string): Array<T> => {
  let finalArray: Array<T> = [];
  if (array && indexKey) {
    const newObject = normalizeArray(array, indexKey);
    if (newObject) {
      finalArray = (<any>Object).values(newObject);
    }
  }
  return finalArray;
};
