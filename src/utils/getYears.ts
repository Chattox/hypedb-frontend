export const getYears = () => {
  const date = new Date();
  const startYear = 1990;
  const currentYear = date.getFullYear();
  const endYear = currentYear + 10;
  const years = [];

  for (let i = startYear; i < endYear + 1; i++) {
    years.push(i);
  }

  return years;
};
