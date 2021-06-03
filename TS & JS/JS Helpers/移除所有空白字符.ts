
export const removeAllWhiteSpaces = (text: undefined | string): string => {
  return text ? text.replace(/\s/g, '') : '';
};