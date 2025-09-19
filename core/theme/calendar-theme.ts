import { PRIMARY } from './color';

export const calendarTheme = {
  itemDayContainer: {
    activeDayFiller: {
      backgroundColor: PRIMARY,
    },
  },
  itemDay: {
    active: () => ({
      container: {
        backgroundColor: PRIMARY,
      },
      content: {
        color: 'white',
      },
    }),
  },
};
