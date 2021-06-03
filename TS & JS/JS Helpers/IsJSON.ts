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