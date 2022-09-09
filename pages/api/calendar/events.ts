import { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';

import { GoogleCalendar } from '@this/src/api/googleCalendar';

export type CalendarEventItem = {
  id?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  description?: string | null;
  title?: string | null;
  location?: string | null;
};

const getCalendarEventsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<CalendarEventItem[]>,
) => {
  const events = await getCalendarEvents();
  res.json(events);
};

export const getCalendarEvents = async (): Promise<CalendarEventItem[]> => {
  const { GOOGLE_EVENTS_CALENDAR_ID: calendarId } = process.env;
  const calendar = GoogleCalendar();
  const timeMin = moment(new Date());
  const timeMax = moment(new Date()).add(6, 'weeks');

  const { data } = await calendar.events.list({
    calendarId,
    singleEvents: true,
    timeMin: timeMin.format(),
    timeMax: timeMax.format(),
    orderBy: 'startTime',
  });

  const items = data.items?.flatMap(({ start, end, description, summary, location, id }) => {
    const eventStart = start?.dateTime && moment(new Date(start?.dateTime));
    // const isPast = start?.dateTime && now.isBefore();
    if (!eventStart || eventStart.isBefore(timeMin) || !start?.dateTime || !end?.dateTime) {
      return [];
    }
    const resolvedLocation = !location
      ? null
      : location?.includes('http')
      ? location
      : `https://maps.google.com?q=${location
          .split(/\W/g)
          .filter((v) => !!v)
          .join('+')}`;
    return {
      id,
      startTime: start?.dateTime,
      endTime: end?.dateTime,
      description,
      title: summary,
      location: resolvedLocation,
    };
  });
  return items ?? [];
};

export default getCalendarEventsHandler;
