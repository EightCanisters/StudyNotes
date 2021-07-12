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


