import { Notify } from 'quasar';
import { computed, ref } from 'vue';
import { persistanceSchedule } from './usePersistanceSchedule.hooks';
import { BaseSchedule, MyBasicSquedule } from '../models/basic';
import { useScheduleHandler } from './useSchedule.hooks';

export const useScheduleTimetabling = () => {
  const { loadData: timeLoad, saveData: timeSave } = persistanceSchedule;

  const sch = timeLoad() || MyBasicSquedule;

  const {
    mappedBaseSchedule,
    mappedRoomSchedule,
    getVerbose,
    onChangeBase,
    schedule
  } = useScheduleHandler(sch);

  // Create data viz
  const empty_group_state = (year: string, group: string) =>
    sch.config.hoursOptions.map((hour) => {
      return {
        turn: ` ${hour} `,
        ...sch.config.daysOptions.reduce(
          (prev, value) => ({
            ...prev,
            [value]: getVerbose(
              mappedBaseSchedule.value[`${year}-${hour}-${group}-${value}`]
            )
          }),
          {}
        )
      };
    });
  const dotDaysXHours = sch.config.daysOptions
    .map((day) => {
      return (
        sch.config.hoursOptions

          // TODO: here
          .filter((x) => x != 'Receso')
          .map((x) => day + x)
      );
    })
    .reduce((prev, curr) => [...prev, ...curr], []);

  const empty_school_state = (year: string) =>
    sch.config.roomsOptions.map((v) => {
      return {
        turn: `[ ${v} ]`,
        ...dotDaysXHours.reduce(
          (prev, value) => ({
            ...prev,
            [value]: mappedRoomSchedule.value[`${year}-${v}-${value}`] || []
            // [value]: (mappedRoomSchedule.value[`${year}-${v}-${value}`] || [])
            //   .map((x) => x.group)
            //   .reduce((prev, x) => `${prev ? `${prev}<br>` : ''}${x}`, '')
          }),
          {}
        )
      };
    });

  const default_group_schedule_object = (year: string) =>
    sch.config.groupsOptions.reduce(
      (prev, current) => ({
        ...prev,
        [current]: empty_group_state(year, current)
      }),
      {}
    );

  const default_school_schedule_object = sch.config.yearsOptions.reduce(
    (prev, current) => ({
      ...prev,
      [current]: {
        groups: default_group_schedule_object(current),
        rooms: empty_school_state(current)
      }
    }),
    {}
  );

  //keeps all schedule in db
  const school_data = ref<any>(default_school_schedule_object);

  //keeps year's numbers
  const year_keys = computed(() => {
    return schedule.value.config.yearsOptions;
  });

  //keeps group's names
  const group_keys = computed(() => {
    return schedule.value.config.groupsOptions;
  });

  //keeps selected year
  const selected_year = ref(year_keys.value[0]);

  //keeps selected group
  const selected_group = ref(group_keys.value[0]);

  //adds new year and saves it
  const add_year = (year: string) => {
    school_data.value[year] = {
      groups: default_group_schedule_object(year),
      rooms: empty_school_state(year)
    };
    schedule.value.config.yearsOptions.push(year);
    selected_year.value = year;
    selected_group.value = group_keys.value[0];
    Notify.create({
      type: 'positive',
      message: `El horario ${year} fue creado y salvado correctamente`
    });
  };

  //adds new group and saves it
  const add_group = (group: string) => {
    school_data.value[selected_year.value].groups[group] = empty_group_state;
    // timeSave(school_data.value);
    schedule.value.config.groupsOptions.push(group);
    selected_group.value = group;
  };

  return {
    school_data,
    group_keys,
    year_keys,
    selected_year,
    selected_group,
    add_group,
    add_year,
    onChangeYear(year: string) {
      selected_year.value = year;
      if (!group_keys.value.includes(selected_group.value)) {
        selected_group.value = group_keys.value[0];
      }
    },
    onSave() {
      timeSave(schedule.value);
    },
    onClear() {
      // groupData.value[selectedYear.value].groups[selectedGroup.value] =
      //   emptyTimeState;
      // groupData.value[selectedYear.value].rooms = emptySchoolState;
      // school_data.value = default_school_schedule_object;
      // timeSave(schedule.value);
    },
    onUpdateBase(payload: {
      year: string;
      group: string;
      hour_index: number;
      column: string;
      value: string;
    }) {
      const hour = schedule.value.config.hoursOptions[payload.hour_index];
      const id = `${payload.year}-${hour}-${payload.group}-${payload.column}`;
      const [subject, cp, room] = payload.value.split(' ');
      const baseSchedule: BaseSchedule = {
        cp: cp == 'cp',
        day: payload.column,
        group: payload.group,
        hour: hour,
        room: room,
        subject: subject,
        year: payload.year
      };
      onChangeBase(id, baseSchedule);
      school_data.value[payload.year].rooms = empty_school_state(payload.year);
    }
  };
};
