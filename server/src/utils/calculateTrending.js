export const calculateTrending = (max, min) => {
  const randomNumber = Number((Math.random() * (max - min) + min).toFixed(1));

  return randomNumber;
};
