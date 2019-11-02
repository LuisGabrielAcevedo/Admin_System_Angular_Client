export const htmlDecode = (str: string): string => {
  var e = document.createElement('textarea');
  e.innerHTML = str;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

export const createFunction = (functionBody: string) => (...args) => {
  let func;
  try {
    func = eval(htmlDecode(functionBody));
  } catch (error) {
    console.log(error);
  }
  if (func) return func(...args);
  return null;
};
