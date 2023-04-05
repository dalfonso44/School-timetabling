import { timeTableData } from './PersistanceDB.hooks';
import { computed, ref } from 'vue';

export const defaultGroup = [
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
export const defaultYear = ['2023', 'test'];

export const emptyTimeState = ['1', '2', '3', 'Receso', '4', '5', '6'].map(
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

export const emptySchoolState = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
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

export const defaultTimeTablingObject = defaultGroup.reduce(
  (prev, current) => ({
    ...prev,
    [current]: emptyTimeState,
  }),
  {}
);

export const defaultTimeTablingYearObject = defaultYear.reduce(
  (prev, current) => ({
    ...prev,
    [current]: {
      groups: defaultTimeTablingObject,
      rooms: emptySchoolState,
    },
  }),
  {}
);

// que difencia entre tener puesto export y no tenerlo
export const useTimetabling = () => {
  //aqui redefino los nombres de los metodos en el hooks por que necesito hacer esto
  const { loadData: timeLoad, saveData: timeSave } = timeTableData;

  const groupData = ref(timeLoad() || defaultTimeTablingYearObject);

  const addGroup = (group: string) => {
    groupData.value[group] = emptyTimeState;
    timeSave(groupData.value);
  };

  const yearKeys = computed(() => {
    return Object.keys(groupData.value);
  });

  const groupKeys = computed(() => {
    // por que necesito poner .value?????
    return Object.keys(groupData.value[selectedYear.value].groups);
  });
  const selectedYear = ref(yearKeys.value[0]);
  const selectedGroup = ref(groupKeys.value[0]);

  return {
    groupData,
    groupKeys,
    yearKeys,
    selectedYear,
    selectedGroup,
    addGroup,
    onSave() {
      timeSave(groupData.value);
    },
    onClear() {
      groupData.value[selectedYear.value].groups[selectedGroup.value] =
      emptyTimeState;
      groupData.value[selectedYear.value].rooms = emptySchoolState;
      //groupData.value = defaultTimeTablingYearObject;
      timeSave(groupData.value);
    },
    onLoad(){
      console.log("AAAA")
    }
  };
};
