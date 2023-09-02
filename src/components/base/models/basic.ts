export interface Dictionary<T = any> {
  [key: string]: T;
}

export interface BaseSchedule {
  /** Subject related course ex: EDA */
  subject: string;

  /** Year related ex: 2023 */
  year: string;

  /** Group related ex: 2023 */
  group: string;

  /** Day of week */
  day: string;

  /** Room related ex: 3 */
  room: string;

  /** Turn related ex: 3 */
  hour: number;

  /** is a practical lesson? */
  cp: boolean;

  /** verification code */
  id?: string;
}

export interface Schedule {
  /** list for each schedule relation */
  schedule: BaseSchedule[];

  /** paint dict use like paint[schedule.id] = color */
  paint: Dictionary<string>;

  /** all the setting needed for create an complete Schedule*/
  config: {
    groupsOptions: string[];
    yearsOptions: string[];
    roomsOptions: string[];
    daysOptions: string[];

    /** use '-' as separator */
    hoursOptions: string[];
  };
}

export const MyBasicSquedule: Schedule = {
  paint: {},
  schedule: [
    {
      cp: true,
      day: 'monday',
      group: 'C111',
      hour: 1,
      room: '1',
      subject: 'EDAI',
      year: '2023'
    }
  ],
  config: {
    daysOptions: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
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
    hoursOptions: ['1', '2', '3', 'Receso', '4', '5', '6']
  }
};
