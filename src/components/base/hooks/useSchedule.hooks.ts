import { computed, ref } from 'vue';
import { BaseSchedule, Dictionary, Schedule } from '../models/basic';

export const getVerbose = (bs: BaseSchedule | undefined) => {
  if (!bs) return '';
  return `${bs.subject} ${bs.cp ? 'cp' : 'c'} ${bs.room}`;
};

export const useScheduleHandler = (sch: Schedule) => {
  const schedule = ref<Schedule>(sch);

  const getID = (bs: BaseSchedule) =>
    `${bs.year}-${bs.hour}-${bs.group}-${bs.day}`;

  const getRoomID = (bs: BaseSchedule) =>
    `${bs.year}-${bs.room}-${bs.day}${bs.hour}`;

  const mappedBaseSchedule = ref<Dictionary<BaseSchedule>>(
    sch.schedule.reduce(
      (prevV, value) => ({
        ...prevV,
        [getID(value)]: value
      }),
      {}
    )
  );
  const mappedRoomSchedule = computed<Dictionary<BaseSchedule[]>>(() =>
    schedule.value.schedule.reduce(
      (prevV, value) => ({
        ...prevV,
        [getRoomID(value)]: [...(prevV[getRoomID(value)] || []), value]
      }),
      {} as Dictionary<BaseSchedule[]>
    )
  );

  // // builder iter
  // sch.schedule.forEach((value) => {
  //   mappedBaseSchedule.value[value.id] = value;
  // });

  const ensureSchedulePersistence = () => {
    schedule.value.schedule = Object.values(mappedBaseSchedule.value);
  };

  const onChangeBase = (id: string, value: BaseSchedule) => {
    console.log('on change >', id, value);
    const oldValue = mappedBaseSchedule.value[id];
    if (!!oldValue) delete mappedBaseSchedule.value[id];
    const newId = getID(value);
    if (mappedBaseSchedule.value[newId]) {
      throw 'invalid structure';
    }
    mappedBaseSchedule.value[newId] = value;
    ensureSchedulePersistence();
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
    getVerbose,
    addBase,
    deleteBase,
    mappedBaseSchedule,
    mappedRoomSchedule
  };
};
