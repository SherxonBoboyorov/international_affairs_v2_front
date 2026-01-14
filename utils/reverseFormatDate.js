export default (reverseOriginalDate) => {
  if (reverseOriginalDate) {
    const separators = ["-", ".", "/"];
    let formattedDate = reverseOriginalDate;
    for (const separator of separators) {
      if (reverseOriginalDate.includes(separator)) {
        const parts = reverseOriginalDate.split(separator);
        formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
        break;
      }
    }
    return formattedDate;
  }
};
