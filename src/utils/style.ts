export const convertJSStyleToCssStyle = (styles: any) => {
  const keys = Object.keys(styles);
  const cssStyle: string[] = [];
  keys.forEach((key) => {
    const cssKey = getCssProb(key);
    const cssValue = styles[key];
    const cssLine = `${cssKey}: ${cssValue};`;
    cssStyle.push(cssLine);
  });
  return cssStyle.join(" ");
};

const getCssProb = (key: string) =>
  key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
