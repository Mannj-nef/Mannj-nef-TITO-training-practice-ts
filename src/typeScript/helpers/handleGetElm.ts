/**
 *
 * @param selector
 * @param getAll
 * @returns
 */

const handleGetElm = <T>(selector: string, getAll?: boolean): T => {
  if (getAll) return document.querySelectorAll(selector) as T;
  return document.querySelector(selector) as T;
};

export default handleGetElm;
