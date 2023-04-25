let timeOut: any;

const debounce = (func: any, delay: number = 2000) => {
  clearTimeout(timeOut);

  if (typeof func === "function") {
    timeOut = setTimeout(func, delay);
  }
};

export default debounce;
