export default (amount) => {
  if (amount) {
    const formatter = new Intl.NumberFormat("uz-UZ", {
      currency: "UZS",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    return formatter.format(amount);
  }
};
