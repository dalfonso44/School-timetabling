import { Notify } from 'quasar';
import { computed, ref } from 'vue';

export const default_groups = [
  'C111',
  'C112',
  'C113',
  'C121',
  'C122',
  'C211',
  'C212',
  'C213',
  'C311',
  'C312',
  'C411',
  'C412',
  'M1',
  'M2',
  'M3',
  'M4',
  'CD1'
];
export const default_years = ['2023', 'test'];

export const empty_group_state = ['1', '2', '3', 'Receso', '4', '5', '6'].map(
  (v) => {
    return {
      turn: ` ${v} `,
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: ''
    };
  }
);

const empty_school_state = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
  (v) => {
    return {
      turn: `[ ${v} ]`,
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: ''
    };
  }
);

export const default_group_schedule_object = default_groups.reduce(
  (prev, current) => ({
    ...prev,
    [current]: empty_group_state
  }),
  {}
);

export const default_school_schedule_object = default_years.reduce(
  (prev, current) => ({
    ...prev,
    [current]: {
      groups: default_group_schedule_object,
      rooms: empty_school_state
    }
  }),
  {}
);

export const useTimetabling = () => {
  const { loadData: timeLoad, saveData: timeSave } = timeTableData;
  //keeps all schedule in db
  const school_data = ref(timeLoad() || default_school_schedule_object);

  //keeps year's numbers
  const year_keys = computed(() => {
    return Object.keys(school_data.value);
  });

  //keeps group's names
  const group_keys = computed(() => {
    return Object.keys(school_data.value[selected_year.value].groups);
  });

  //keeps selected year
  const selected_year = ref(year_keys.value[0]);

  //keeps selected group
  const selected_group = ref(group_keys.value[0]);

  //adds new year and saves it
  const add_year = (year: string) => {
    school_data.value[year] = {
      groups: default_group_schedule_object,
      rooms: empty_school_state
    };
    timeSave(school_data.value);
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
    timeSave(school_data.value);
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
      if (
        !Object.keys(school_data.value[year].groups).includes(
          selected_group.value
        )
      ) {
        selected_group.value = Object.keys(school_data.value[year].groups)[0];
      }
    },
    onSave() {
      timeSave(school_data.value);
    },
    onClear() {
      // groupData.value[selectedYear.value].groups[selectedGroup.value] =
      //   emptyTimeState;
      // groupData.value[selectedYear.value].rooms = emptySchoolState;
      school_data.value = default_school_schedule_object;
      timeSave(school_data.value);
    }
  };
};
