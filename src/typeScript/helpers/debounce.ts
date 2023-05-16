let timeOut: NodeJS.Timeout | number;

const debounce = (func: Function, delay: number = 2000) => {
  clearTimeout(timeOut);

  if (typeof func === "function") {
    timeOut = setTimeout(func, delay);
  }
};

export default debounce;
