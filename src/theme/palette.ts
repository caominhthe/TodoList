export const hexToRgba = (hex: string, opacity: number) => {
  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!values) return "";
  const rgb = {
    r: parseInt(values[1], 16),
    g: parseInt(values[2], 16),
    b: parseInt(values[3], 16),
  };
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

export const Palette = {
  white: "#FFFFFF",
  black: "#000000",
  grey: "#DADADA",
  red: "#F44336",
  lightBlue: "#CBDEF2",
  darkBlue: "#4b7bad",
  backgroundGrey: "#F8F8F8",
};
