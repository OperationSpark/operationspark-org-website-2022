import { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';

import { GoogleCalendar } from '@this/src/api/googleCalendar';

const getCalendarEvents = async (req: NextApiRequest, res: NextApiResponse) => {
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
    if (!eventStart || eventStart.isBefore(timeMin)) {
      return [];
    }

    return {
      id,
      startTime: start?.dateTime,
      endTime: end?.dateTime,
      description,
      title: summary,
      location,
    };
  });
  res.json(items);
};

export default getCalendarEvents;
