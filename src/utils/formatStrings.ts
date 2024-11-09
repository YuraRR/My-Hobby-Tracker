export const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

export const getHoursFromMinutes = (minutes: number) => {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

export const getYearFromDate = (date: string) => {
  const [year] = date.split("-");
  return year;
};
