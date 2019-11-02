/**
 * Function to transform string date with format DDMMYYYY to ISO Date string
 * @param date The date to transform in format DDMMYYYY
 */
export const getISOFromDate = (date: string): string => {
  const dateObj = new Date(
    +date.slice(4),
    +date.slice(2, 4) - 1,
    +date.slice(0, 2)
  );
  return dateObj.toISOString();
};

/**
 * Function to transform ISO Date string to date with format DDMMYYYY
 * @param date The date to trasnform in ISO Date string format
 */
export const getDateFromISO = (date: string): string => {
  if (date && date.length > 8) {
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    return `${day}${month}${year}`;
  }
  return date;
};
