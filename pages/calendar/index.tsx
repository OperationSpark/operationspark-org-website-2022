import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { Content, Main } from '@this/src/components/layout';
import { cardShadowRtl } from '@this/src/theme/styled/mixins/shadows';

interface CalendarEventItem {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
  title: string;
  location: string;
}

const CalendarEvents: NextPage = () => {
  const [calEvents, setCalEvents] = useState<CalendarEventItem[]>([]);

  useEffect(() => {
    axios
      .get('/api/calendar/events')
      .then(({ data }) => {
        console.log(data);
        setCalEvents(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Main>
      <CalendarEventsStyles>
        <Content>
          <h1 className='dynamic-h1 primary-secondary text-center'>Upcoming Events</h1>
          <div className='calendar-events'>
            {calEvents.map((calItem) => (
              <div key={calItem.id} className='calendar-event'>
                <h2 className='dynamic-h2 primary-secondary event-title'>{calItem.title}</h2>

                <div className='event-details'>
                  <div className='date-time'>
                    <h3 className='calendar-date'>
                      {moment(calItem.startTime).format('MM/DD/YYYY')}
                    </h3>
                    <div className='calendar-time'>
                      {moment(calItem.startTime).format('h:mma')} -{' '}
                      {moment(calItem.endTime).format('h:mma')}
                    </div>
                  </div>
                  {calItem.description && (
                    <div className='event-description'>
                      {calItem.description.split('\n').map((p, i) => (
                        <p key={`${p}-${i}`}>{p}</p>
                      ))}
                    </div>
                  )}
                  {calItem.location && (
                    <a
                      className='event-location anchor'
                      href={
                        calItem.location.includes('http')
                          ? calItem.location
                          : `https://maps.google.com?q=${calItem.location
                              .split(/\W/g)
                              .filter((v) => !!v)
                              .join('+')}`
                      }
                      target='_blank'
                      rel='noreferrer'
                    >
                      Join {calItem.title} event
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Content>
      </CalendarEventsStyles>
    </Main>
  );
};

export default CalendarEvents;

const CalendarEventsStyles = styled.div`
  .calendar-events {
    display: flex;
    align-content: center;
    flex-flow: column wrap;
    gap: 2rem;
    margin-top: 2rem;
  }
  .calendar-event {
    ${cardShadowRtl}
    text-align: center;
    width: 500px;
    max-width: 100%;
    border-radius: 0.5rem;
    padding: 1rem;
  }
  .event-title {
    line-height: 1em;
  }
  .date-time {
    padding: 1rem 0;
  }
  .calendar-date {
    font-size: 1.1rem;
    font-weight: 700;
  }
  .calendar-time {
    font-weight: 200;
  }
  .event-details {
  }
  .event-location {
  }
  .event-description {
    padding-bottom: 1rem;
  }
`;
