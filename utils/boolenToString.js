export default (value) => {
  if (typeof value === "boolean") {
    return value ? "1" : "0";
  } else if (typeof value === "number") {
    return value === 1 ? true : value === 0 ? false : value;
  } else {
    return value;
  }
};
