import moment from 'moment-timezone';
import { toDayJs } from './time';

export const toCentTime = (d?: string | Date): Date =>
  moment(typeof d === 'string' ? new Date(d) : d)
    .tz('America/Chicago', true)
    .toDate();

export type TCountdownTime = {
  m: moment.Moment;
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};
export const getCountdownTime = (endTime: Date = new Date()): TCountdownTime => {
  const total = endTime.getTime() - new Date().getTime();

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    m: moment(endTime),
    total,
    days,
    hours,
    minutes,
    seconds,
    isComplete: total < 0,
  };
};

export const checkDaysEqual = (date1: Date, date2 = new Date()) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

export const getFormattedDateTime = (dateTime?: string | Date | null) => {
  if (!dateTime) {
    return null;
  }
  const d = new Date(dateTime);

  return {
    date: d.toLocaleDateString('en-US', { dateStyle: 'long' }),
    time: d.toLocaleTimeString('en-US', { timeStyle: 'short' }),
    tz: d.toLocaleString('en-US', { timeZoneName: 'short' }).split(' ').pop(),
  };
};

export const parseShowcaseTime = (endTime?: string): string | null => {
  if (!endTime) return null;
  // Force showcase timezone to CT while preserving the hours/minutes
  const showcaseStart = toDayJs(new Date(endTime)).tz('America/Chicago', true);
  const now = toDayJs(new Date()).tz('America/Chicago', true);

  if (showcaseStart && !now.isAfter(showcaseStart, 'hour')) {
    return showcaseStart.toISOString();
  }

  return null;
};
