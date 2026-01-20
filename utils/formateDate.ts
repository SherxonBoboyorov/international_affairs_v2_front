/**
 * Sana formatini teskari ko'rinishga keltirish funksiyasi
 * @param reverseOriginalDate - Teskari sana (masalan: 2024-01-15)
 * @param type - Ajratuvchi belgi (default: .)
 */
export default (
  reverseOriginalDate: null | string | undefined,
  type: string = "."
): string => {
  if (reverseOriginalDate) {
    const separators = ["-", ".", "/"];
    let formattedDate = reverseOriginalDate;
    for (const separator of separators) {
      if (reverseOriginalDate.includes(separator)) {
        const parts = reverseOriginalDate.split(separator);
        if (parts.length >= 3) {
          formattedDate = `${parts[2]}${type}${parts[1]}${type}${parts[0]}`;
        }
        break;
      }
    }
    return formattedDate;
  }
  return "";
};
