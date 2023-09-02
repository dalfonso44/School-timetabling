import { ref } from 'vue';
import { BaseSchedule, Dictionary, Schedule } from '../models/basic';

const CHD_KEY = 'schedule-key';

export const usePersistanceScheduleDB = () => {
  return {
    saveData(obj: any[]) {
      localStorage.setItem(CHD_KEY, JSON.stringify(obj));
    },
    loadData(): Schedule | false {
      const obj = localStorage.getItem(CHD_KEY);
      if (obj) return JSON.parse(obj) as Schedule;
      return false;
    },
    cleanData() {
      localStorage.removeItem(CHD_KEY);
    }
  };
};

export const useScheduleHandler = (sch: Schedule) => {
  const schedule = ref<Schedule>(sch);

  const getID = (bs: BaseSchedule) =>
    `${bs.year}-${bs.subject}-${bs.group}-${bs.day}-${bs.hour}-${bs.room}-${
      bs.cp ? 'cp' : 'conf'
    }`;

  const mappedBaseSchedule = ref<Dictionary<BaseSchedule>>(
    sch.schedule.reduce(
      (prevV, value) => ({
        ...prevV,
        [getID(value)]: value
      }),
      {}
    )
  );

  // // builder iter
  // sch.schedule.forEach((value) => {
  //   mappedBaseSchedule.value[value.id] = value;
  // });

  const onChangeBase = (id: string, value: BaseSchedule) => {
    const oldValue = mappedBaseSchedule.value[id];
    if (!!oldValue) delete mappedBaseSchedule.value[id];
    const newId = getID(value);
    if (mappedBaseSchedule.value[newId]) {
      throw 'invalid structure';
    }
    mappedBaseSchedule.value[newId] = value;
  };

  const addBase = (value: BaseSchedule) => {
    const newId = getID(value);
    if (mappedBaseSchedule.value[newId]) {
      throw 'invalid structure';
    }
    mappedBaseSchedule.value[newId] = value;
  };

  const deleteBase = (id: string) => {
    if (!!mappedBaseSchedule.value[id]) {
      throw 'invalid structure';
    }
    delete mappedBaseSchedule.value[id];
  };

  return {
    schedule,
    onChangeBase,
    addBase,
    deleteBase,
    mappedBaseSchedule
  };
};
