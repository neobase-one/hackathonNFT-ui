import { DayTime, Mood } from '~common/types';
import { calculateDayTime } from './date.helper';

const mappedMoodDayTime: Record<Mood, Record<DayTime, number>> = {
  adventurous: { dusk: 1, dawn: 2, noon: 3, sunset: 4 },
  blissful: { dusk: 5, dawn: 6, noon: 7, sunset: 8 },
  contemplative: { dusk: 9, dawn: 10, noon: 11, sunset: 12 },
  nostalgic: { dusk: 13, dawn: 14, noon: 15, sunset: 16 },
  refreshed: { dusk: 17, dawn: 18, noon: 19, sunset: 20 },
};

export const calculateGradientType = (mood: Mood) => {
  const weather = calculateDayTime();

  return mappedMoodDayTime[mood][weather];
};
