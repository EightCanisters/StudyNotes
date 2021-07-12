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