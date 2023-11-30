import { computed, ref } from 'vue';
import { BaseSchedule, Dictionary, Schedule } from '../models/basic';
import { persistanceSchedule } from './usePersistanceSchedule.hooks';

const { saveData: timeSave } = persistanceSchedule;

export const getVerbose = (bs: BaseSchedule | undefined) => {
  if (!bs) return '';
  if (!bs.room || bs.room == '_') return bs.subject;
  if (bs.description != undefined)
    return `${bs.subject} ${bs.cp ? 'cp' : 'c'} ${bs.room} ${bs.description}`;
  return `${bs.subject} ${bs.cp ? 'cp' : 'c'} ${bs.room}`;
};

export const useScheduleHandler = (sch: Schedule) => {
  const schedule = ref<Schedule>(sch);

  const getID = (bs: BaseSchedule) =>
    `${bs.year}-${bs.hour}-${bs.group}-${bs.day}`;

  const getRoomID = (bs: BaseSchedule) =>
    `${bs.year}-${bs.room}-${bs.day}-${bs.hour}`;

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

  const ensureSubjectDefinition = (base: BaseSchedule) => {
    if (!schedule.value.config.subjectsByProfessors)
      schedule.value.config.subjectsByProfessors = {};
    if (!schedule.value.config.subjectsByProfessors[base.year])
      schedule.value.config.subjectsByProfessors[base.year] = {};
    if (!schedule.value.config.subjectsByProfessors[base.year][base.group])
      schedule.value.config.subjectsByProfessors[base.year][base.group] = {};

    if (
      base.subject &&
      !schedule.value.config.subjectsByProfessors[base.year][base.group][
        base.subject
      ]
    ) {
      schedule.value.config.subjectsByProfessors[base.year][base.group][
        base.subject
      ] = {
        name: '',
        professors: {
          c: [],
          cp: []
        }
      };
    }
  };

  const ensureSchedulePersistence = () => {
    schedule.value.schedule = Object.values(mappedBaseSchedule.value);
    timeSave(schedule.value);

    schedule.value.schedule.map((base) => ensureSubjectDefinition(base));
  };

  if (!schedule.value.config.subjectsByProfessors)
    schedule.value.config.subjectsByProfessors = {};
  schedule.value.config.yearsOptions.forEach((x) => {
    if (!schedule.value.config.subjectsByProfessors[x]) {
      schedule.value.config.subjectsByProfessors[x] = {};
    }
  });

  schedule.value.schedule.map((base) => ensureSubjectDefinition(base));

  const onChangeBase = (id: string, value: BaseSchedule) => {
    const oldValue = mappedBaseSchedule.value[id];
    if (!!oldValue) delete mappedBaseSchedule.value[id];
    const newId = getID(value);
    if (mappedBaseSchedule.value[newId]) {
      throw 'invalid structure';
    }
    mappedBaseSchedule.value[newId] = value;
    ensureSchedulePersistence();
    ensureSubjectDefinition(value);
    schedule.value.config.subjectsByProfessors = {
      ...schedule.value.config.subjectsByProfessors
    };
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
    mappedRoomSchedule,
    getID
  };
};
