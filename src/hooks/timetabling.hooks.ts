import { Notify } from 'quasar';
import { timeTableData } from './PersistanceDB.hooks';
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
  'CD1',
];
export const default_years = ['2023', 'test'];

export const default_group_schedule = ['1', '2', '3', 'Receso', '4', '5', '6'].map(
  (v) => {
    return {
      turn: ` ${v} `,
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
    };
  }
);

const default_school_schedule = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
  (v) => {
    return {
      turn: `[ ${v} ]`,
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
    };
  }
);

export const group_schedule_object = default_groups.reduce(
  (prev, current) => ({
    ...prev,
    [current]: default_group_schedule,
  }),
  {}
);

export const school_schedule_object = default_years.reduce(
  (prev, current) => ({
    ...prev,
    [current]: {
      groups: group_schedule_object,
      rooms: default_school_schedule,
    },
  }),
  {}
);

export const useTimetabling = () => {
  const { loadData: timeLoad, saveData: timeSave } = timeTableData;


  //to keep school schedule of all years
  const school_data = ref(timeLoad() || school_schedule_object);

  //to keep all years 
  const year_keys = computed(() => {
    return Object.keys(school_data.value);
  });

  //to keep all groups
  const group_keys = computed(() => {
    return Object.keys(school_data.value[selected_year.value].groups);
  });

  // to keep selected year
  const selected_year = ref(year_keys.value[0]);

  //to keep selected group
  const selected_group = ref(group_keys.value[0]);

  //adds a new year to the DB and saves changes
  const addYear = (year: string) => {
    school_data.value[year] = {
      groups: group_schedule_object,
      rooms: default_school_schedule,
    };
    timeSave(school_data.value);
    selected_year.value = year;
    selected_group.value = group_keys.value[0];
    Notify.create({
      type: 'positive',
      message: `El horario ${year} fue creado y salvado correctamente`,
    });
  };

  //adds a new group for the selected year and saves it 
  const addGroup = (group: string) => {
    school_data.value[selected_year.value].groups[group] = default_group_schedule;
    timeSave(school_data.value);
    selected_group.value = group;
  };

  return {
    school_data,
    groupKeys: group_keys,
    yearKeys: year_keys,
    selected_year,
    selectedGroup: selected_group,
    addGroup,
    addYear,
    onChangeYear(year: string) {
      selected_year.value = year;
      if (
        !Object.keys(school_data.value[year].groups).includes(selected_group.value)
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
      school_data.value = school_schedule_object;
      timeSave(school_data.value);
    },
  };
};
