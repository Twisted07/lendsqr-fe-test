export function _cleanDate(dateString: string) {
  const splitDate = dateString.split('at');
  const concatString = splitDate.join(" ");
  return concatString;
}