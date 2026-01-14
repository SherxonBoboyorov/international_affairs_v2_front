export default (reverseOriginalDate, type = ".") => {
  if (reverseOriginalDate) {
    const separators = ["-", ".", "/"];
    let formattedDate = reverseOriginalDate;
    for (const separator of separators) {
      if (reverseOriginalDate.includes(separator)) {
        const parts = reverseOriginalDate.split(separator);
        formattedDate = `${parts[2]}${type}${parts[1]}${type}${parts[0]}`;
        break;
      }
    }
    return formattedDate;
  }
};
