import { BaseSchedule } from '../models/basic';
import { Notify } from 'quasar';


export const twoSubjectInSameRoom = (
  subjects: array,
  baseSchedule: BaseSchedule
) => {
  if (subjects[0][`subject`] != baseSchedule.subject){
    Notify.create({
      type: 'negative',
      message: `No se puede impartir ${subjects[0][`subject`]} y ${baseSchedule.subject} al mismo tiempo`
    });
    return false;
  }
  return true;
};


export const classType = (
  subjects: array,
  baseSchedule: BaseSchedule
) => {
  if (subjects[0][`cp`] != baseSchedule.cp){
    Notify.create({
      type: 'negative',
      message: `No se puede impartir una conferencia y una clase práctica al mismo tiempo`
    });
    return false;
  }
  return true;
};