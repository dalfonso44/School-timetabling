//const SCHOOL_KEY = 'sch-jwl'
const TIMETA_KEY = 'tim-jwl';

export const usePersistanceDB = (key: string) => {
  return {
    saveData(obj: any[]) {
      localStorage.setItem(key, JSON.stringify(obj));
    },
    loadData() {
      const obj = localStorage.getItem(key);
      return !!obj && JSON.parse(obj);
    },
    cleanData() {
      localStorage.removeItem(key);
    },
  };
};

export const timeTableData = usePersistanceDB(TIMETA_KEY);
//export const schoolTableData = usePersistanceDB(SCHOOL_KEY);
