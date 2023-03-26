import { registerFont } from 'canvas';

export const registerFonts = (fonts: { [key: string]: string }) => {
  Object.keys(fonts).forEach((k) => registerFont(fonts[k], { family: k }));
};
