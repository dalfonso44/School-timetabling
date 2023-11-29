import { Dialog, Notify } from 'quasar';
import { computed, ref } from 'vue';
import { persistanceSchedule } from './usePersistanceSchedule.hooks';
import {
  BaseSchedule,
  MyBasicSquedule,
  SubjectDefinition
} from '../models/basic';
import { useScheduleHandler } from './useSchedule.hooks';
import { validationFunction } from './validations.hooks';

export const useScheduleTimetabling = () => {
  const {
    loadData: timeLoad,
    saveData: timeSave,
    exportData: timeExport,
    importData: timeImport,
    cleanData
  } = persistanceSchedule;

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
          .map((x) => `${day}-${x}`)
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

    refreshView();

    Notify.create({
      type: 'positive',
      message: `El horario ${group} fue creado y salvado correctamente`
    });
  };

  const add_subject = (subject: string) => {
    schedule.value.config.subjectsWithoutRooms?.push(subject);
  };

  const refreshView = () => {
    school_data.value[selected_year.value].groups =
      default_group_schedule_object(selected_year.value);
    school_data.value[selected_year.value].rooms = empty_school_state(
      selected_year.value
    );
  };

  return {
    sch,
    school_data,
    group_keys,
    year_keys,
    selected_year,
    selected_group,
    schedule,
    add_group,
    add_year,
    add_subject,
    onChangeBase,
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
      cleanData();
      window.location.reload();
    },
    onExport() {
      Dialog.create({
        title: 'Guardar horario',
        message: 'Nombre del fichero',
        prompt: {
          model: '',
          type: 'text',
          suffix: '.sch'
        },
        cancel: true,
        persistent: true
      })
        .onOk((data) => {
          timeExport(data, schedule.value);
        })
        .onCancel(() => {
          console.log('>>>> Cancel');
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    onImport(file: any) {
      const FR = new FileReader();
      FR.onload = function (e: any) {
        const contents = FR.result as string;
        timeImport(contents);
      };
      FR.readAsText(file);
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
      const desc =
        payload.value.split(' ').length > 3
          ? '(' + payload.value.split('(')[1]
          : undefined;

      const li = payload.value.split(' ');
      const [subject, cp, room] = li.length == 1 ? [li[0], 'c', '_'] : li;
      const baseSchedule: BaseSchedule = {
        cp: cp == 'cp',
        day: payload.column,
        group: payload.group,
        hour: hour,
        room: room,
        subject: subject,
        year: payload.year,
        description: desc
      };

      console.log(' xxx ');

      if (!validationFunction(schedule.value, baseSchedule)) return;

      onChangeBase(id, baseSchedule);
      school_data.value[payload.year].rooms = empty_school_state(payload.year);

      console.log('||', schedule.value.config.subjectsByProfessors);
    },
    updateBaseSch(id: string, sch: BaseSchedule) {
      if (!validationFunction(schedule.value, sch)) return;

      onChangeBase(id, sch);

      refreshView();
    },
    onChangeSubject(key: string, value: SubjectDefinition) {
      schedule.value.config.subjectsByProfessors[selected_year.value][key] =
        value;
      timeSave(schedule.value);
      console.log('c', schedule.value.config.subjectsByProfessors);
      schedule.value.config.subjectsByProfessors = {
        ...schedule.value.config.subjectsByProfessors
      };
    }
  };
};
