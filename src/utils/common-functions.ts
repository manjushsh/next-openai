/* eslint-disable newline-before-return */
const CommonFunctions = {
  camelCaseToNormalText: (text = "") =>
    text.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
  getOptionObjectFromString: (text = "", key = "label", value = "value") => {
    return {
      [key]: text,
      [value]: text?.toLowerCase()?.replace(" ", "-") || "",
    };
  },
  isValidNumber: (value: string) => {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) && isFinite(parsedValue);
  },
  getArrayFromCommaSeperatedString: (text: string) => text.split(","),
};

export default CommonFunctions;
