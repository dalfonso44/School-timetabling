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
  hour: string;

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

  /** background paint dict use like background[schedule.id] = color */
  background: Dictionary<string>;

  /** all the setting needed for create an complete Schedule*/
  /*aqui es donde annado todas las configuraciones que pueda
  necesitar para el futuro como el claustro de profesors, la cantidad de horas
  por asignaturas, etc*/
  config: {
    groupsOptions: string[];
    yearsOptions: string[];
    roomsOptions: string[];
    daysOptions: string[];
    /** use '-' as separator */
    hoursOptions: string[];

    /*subjects thaught in other place */
    subjectsWithoutRooms?: string[];
    /* teachers who teach the subjects*/
    professors?: string[];

    subjectsByProfessor?: Dictionary<string>;
    hoursClassBySubject?: Dictionary<string>;

    validationFunctions: string[];
    scheduleName?: string;
  };
}

export const MyBasicSquedule: Schedule = {
  paint: {},
  background: {},
  schedule: [],
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
    hoursOptions: ['1', '2', '3', 'Receso', '4', '5', '6'],
    validationFunctions: ['twoSubjectInSameRoom', 'classType']
  }
};
