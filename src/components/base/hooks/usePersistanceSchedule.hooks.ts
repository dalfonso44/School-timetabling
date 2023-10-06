import { Notify } from 'quasar';
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
    },
    exportData(fileName: string, obj: Schedule) {
      localStorage.setItem(key, JSON.stringify(obj));
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(
        new Blob([JSON.stringify(obj)], { type: 'text/plain;charset=utf-8;' })
      );
      a.download = `${fileName}.sch`;

      // Append anchor to body.
      document.body.appendChild(a);
      a.click();

      // Remove anchor from body
      document.body.removeChild(a);

      console.log(JSON.stringify(obj));

      Notify.create({
        message: 'Horario salvado con éxito !!!',
        type: 'positive'
      });
    },
    importData(content: string): Schedule | false {
      try {
        const scd = JSON.parse(content) as Schedule;
        localStorage.setItem(key, JSON.stringify(scd));
        window.location.reload();
      } catch (error) {
        Notify.create({
          message: `Error en la carga del fichero ${error}`
        });
      }
      return false;
    }
  };
};

export const persistanceSchedule = usePersistanceScheduleDB(CHD_KEY);
