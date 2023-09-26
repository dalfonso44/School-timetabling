import { BaseSchedule, Dictionary, Schedule } from '../models/basic';
import { Notify } from 'quasar';

export const twoSubjectInSameRoom = (
  schedule: any,
  baseScheduleChange: BaseSchedule
) => {
  // TODO: Fix here
  const subjectPlace =
    schedule[baseScheduleChange.year].rooms[
      parseInt(baseScheduleChange.hour) - 1
    ][`${baseScheduleChange.day}${baseScheduleChange.hour}`][0];

  const subject = (subjectPlace && subjectPlace['subject']) || '';

  if (subject && subject != baseScheduleChange.subject) {
    Notify.create({
      type: 'negative',
      message: `No se puede impartir ${subject} y ${baseScheduleChange.subject} al mismo tiempo`
    });
    return false;
  }

  return true;
};

export const classType = (schedule: any, baseScheduleChange: BaseSchedule) => {
  // TODO: Fix here
  const cpPlace =
    schedule[baseScheduleChange.year].rooms[
      parseInt(baseScheduleChange.hour) - 1
    ][`${baseScheduleChange.day}${baseScheduleChange.hour}`][0];
  const cp = (cpPlace && cpPlace['cp']) || '';
  if (cp && cp != baseScheduleChange.cp) {
    Notify.create({
      type: 'negative',
      message:
        'No se puede impartir una conferencia y una clase práctica al mismo tiempo'
    });
    return false;
  }
  return true;
};

export const validationFunctionMapped: Dictionary<
  (schedule: any, baseScheduleChange: BaseSchedule) => boolean
> = {
  twoSubjectInSameRoom: twoSubjectInSameRoom,
  classType: classType
};

export const validationFunction = (
  sch: Schedule,
  schedule: any,
  baseScheduleChange: BaseSchedule
) => {
  sch.config.validationFunctions.forEach((funcKey) => {
    if (!!validationFunctionMapped[funcKey]) {
      const answ = validationFunctionMapped[funcKey](
        schedule,
        baseScheduleChange
      );
      if (!answ) return false;
    }
  });
  return true;
};
