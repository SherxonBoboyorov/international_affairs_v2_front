export default (originalDate) => {
  if (originalDate) {
    if (
      originalDate.toString().length === 5 &&
      !originalDate.toString().includes(".")
    ) {
      const excelBaseDate = new Date(1900, 0, 1);
      excelBaseDate.setDate(
        excelBaseDate.getDate() + parseInt(originalDate, 10) - 2
      );
      const day = excelBaseDate.getDate();
      const month = excelBaseDate.getMonth() + 1;
      return `${day}.${month}`;
    } else {
      return originalDate;
    }
  }
};
