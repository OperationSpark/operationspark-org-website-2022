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

const parseEventLocation = (location?: string | null) => {
  if (!location) {
    return null;
  }
  if (location?.includes('http')) {
    return location;
  }
  const mapsUrl = `https://maps.google.com?q=${location
    .split(/\W/g)
    .filter((v) => !!v)
    .join('+')}`;

  return mapsUrl;
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

    if (!eventStart || eventStart.isBefore(timeMin) || !start?.dateTime || !end?.dateTime) {
      return [];
    }
    const resolvedLocation = parseEventLocation(location);
    return {
      id,
      startTime: start?.dateTime ?? null,
      endTime: end?.dateTime ?? null,
      description: description ?? null,
      title: summary ?? null,
      location: resolvedLocation,
    };
  });
  return items ?? [];
};

export default getCalendarEventsHandler;
