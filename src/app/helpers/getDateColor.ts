export const getDateColor = (seed: Date) => {
  const time = seed.getTime();
  let color = Math.floor(Math.abs(Math.sin(time) * 16777215)).toString(16);
  // pad any colors shorter than 6 characters with leading 0s
  while (color.length < 6) {
    color = "0" + color;
  }

  return `#${color}`;
};
