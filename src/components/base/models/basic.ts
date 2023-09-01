export interface Dictionary<T = any> {
  [key: string]: T;
}

export interface BaseSchedule {
  /** Subject related course ex: EDA */
  subject: string;

  /** Year related ex: 2023 */
  year: string;
  group: string;
  day: number;
  room: string;
  hour: number;
  cp: boolean;
  id: string;
}

export interface Schedule {
  /** list for each schedule relation */
  schedule: BaseSchedule[];

  /** paint dict use like paint[schedule.id] = color */
  paint: Dictionary<string>;

  /** all the setting needed for create an Schedule*/
  config: {
    groupsOptions: string[];
    yearsOptions: string[];
    roomsOptions: string[];
    daysOptions: number[];

    /** use '-' as separator */
    hoursOptions: string[];
  };
}

export const MyBasicSquedule: Schedule = {
  paint: {},
  schedule: [],
  config: {
    daysOptions: [1, 2, 3, 4, 5],
    groupsOptions: [
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
    ],
    roomsOptions: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    yearsOptions: ['2023'],
    hoursOptions: ['1', '2', '3', '-', '4', '5', '6']
  }
};
