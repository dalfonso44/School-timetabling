export const getColor = (str: string) => {
  str = str.substring(0, 2) + str.substring(0, 2);
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    rgb[i] = value;
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};
