export const convertIsoToString = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getHours()}h ${dateObj.getMinutes()}m ${dateObj.getSeconds()}s`
};