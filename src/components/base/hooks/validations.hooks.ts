import { BaseSchedule } from '../models/basic';

export const twoSubjectInSameRoom = (
  subjects: array,
  baseSchedule: BaseSchedule
) => {
  if (subjects[0][`subject`] != baseSchedule.subject){
    return false;
  }
  return true;
};


export const classType = (
  subjects: array,
  baseSchedule: BaseSchedule
) => {
  if (subjects[0][`cp`] != baseSchedule.cp){
    return false;
  }
  return true;
};