import { calendar as googleCalendar, auth as Auth } from '@googleapis/calendar';

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');

export const getAuth = () =>
  new Auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });

export const GoogleCalendar = () =>
  googleCalendar({
    version: 'v3',
    auth: getAuth(),
  });
