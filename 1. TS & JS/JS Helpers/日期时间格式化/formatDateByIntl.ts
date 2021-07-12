export type Maybe<T> = T | undefined;

export const formatDate = (date: Maybe<Date>, locale = 'en-US'): string => {
  if (!date || isNaN(date.getTime())) return '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const formatDateWithOptions = (
  date: Maybe<Date>,
  options: Maybe<Intl.DateTimeFormatOptions>,
  locale = 'en-US',
): string => {
  if (!date || isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const formatDateStringWithOptions = (
  date: Maybe<string>,
  options: Maybe<Intl.DateTimeFormatOptions>,
  locale = 'en-US',
): string => {
  if (!date) {
    return '';
  }

  const parsed: Date = new Date(date);

  if (isNaN(parsed.getTime())) {
    return date;
  }

  return formatDateWithOptions(parsed, options, locale);
};