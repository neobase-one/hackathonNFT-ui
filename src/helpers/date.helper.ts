export const calculateDayTime = (date: Date = new Date()) => {
  if (date.getHours() >= 0 && date.getHours() < 6) return 'dusk';

  if (date.getHours() >= 6 && date.getHours() < 12) return 'dawn';

  if (date.getHours() >= 12 && date.getHours() < 18) return 'noon';

  return 'sunset';
};
