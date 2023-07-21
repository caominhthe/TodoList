export const hexToRgba = (hex: string, opacity: number) => {
  const values = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!values) return '';
  const rgb = {
    r: parseInt(values[1], 16),
    g: parseInt(values[2], 16),
    b: parseInt(values[3], 16),
  };
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};


const white = '#FFFFFF';
const black = '#000000';
const grey = '#DADADA';
const red = '#F44336';
const lightBlue = '#CBDEF2';
const textDark = '#434343';
const textLightenDark = hexToRgba(textDark, 0.6);
const yellow = '#F2C94C';

export const Palette = {
  white,
  black,
  grey,
  red,
  lightBlue,
  yellow,
  backgroundDark: black,
  backgroundGrey: '#F8F8F8',
  textLight: white,
  border: grey,
  textDark,
  textLightenDark,
};

