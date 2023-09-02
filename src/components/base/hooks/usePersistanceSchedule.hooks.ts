import { Schedule } from '../models/basic';

const CHD_KEY = 'schedule-key';

export const usePersistanceScheduleDB = (key: string) => {
  return {
    saveData(obj: Schedule) {
      localStorage.setItem(key, JSON.stringify(obj));
    },
    loadData(): Schedule | false {
      const obj = localStorage.getItem(key);
      if (obj) return JSON.parse(obj) as Schedule;
      return false;
    },
    cleanData() {
      localStorage.removeItem(key);
    }
  };
};

export const persistanceSchedule = usePersistanceScheduleDB(CHD_KEY);
