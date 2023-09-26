import { BaseSchedule } from '../models/basic';
import { Notify } from 'quasar';

export const validationFunction=(
  sch:Schedule,
  schedule:any,
  baseScheduleChange: BaseSchedule,

) => {

  for(let i = 0; i< sch.config.validationFunctions.length; i++){
    eval(sch.config.validationFunctions[i])(schedule,baseScheduleChange) 
  }  
  return true;
}

export const twoSubjectInSameRoom = (
  schedule:Schedule,
  baseScheduleChange: any,

) => {
  
    const subject = schedule.value[baseScheduleChange.year].rooms[parseInt(baseScheduleChange.hour)-1]
    [`${baseScheduleChange.day}${baseScheduleChange.hour}`][0][`subject`]

  if (subject != baseScheduleChange.subject){
    Notify.create({
      type: 'negative',
      message: `No se puede impartir ${subjects[0][`subject`]} y ${baseSchedule.subject} al mismo tiempo`
    });
    return false;
  }
};


export const classType = (
  schedule:Schedule,
  baseScheduleChange: any,

) => {
  const cp = schedule.value[baseScheduleChange.year].rooms[parseInt(baseScheduleChange.hour)-1]
    [`${baseScheduleChange.day}${baseScheduleChange.hour}`][0][`cp`]
  if (cp != baseScheduleChange.cp){
    Notify.create({
      type: 'negative',
      message: `No se puede impartir una conferencia y una clase práctica al mismo tiempo`
    });
    return false;
  }

};