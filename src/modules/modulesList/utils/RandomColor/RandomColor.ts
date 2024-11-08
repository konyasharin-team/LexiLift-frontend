export const getRandomColor = () => {
  const colors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'teal'];
  return colors[Math.floor(Math.random() * colors.length)];
};
