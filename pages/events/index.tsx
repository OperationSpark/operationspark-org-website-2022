import { NextPage } from 'next';
import styled from 'styled-components';

import moment from 'moment';
import { Content, Main } from '@this/src/components/layout';
import { CalendarEventItem } from '@this/pages-api/calendar/events';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '@this/src/components/Elements/Spinner';
import { anchor } from '@this/src/theme/styled/mixins/anchor';

type CalendarEventProps = {
  calEvents: CalendarEventItem[];
};

const CalendarEvents: NextPage<CalendarEventProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [calEvents, setCalEvents] = useState<CalendarEventItem[]>([]);

  useEffect(() => {
    axios
      .get<CalendarEventItem[]>('/api/calendar/events')
      .then(({ data }) => {
        setCalEvents(data);
        setLoading(false);
      })
      .catch((err) => console.error('Failed to fetch calendar events\n', err));
  }, []);

  return loading ? (
    <Main>
      <Spinner />
    </Main>
  ) : (
    <Main>
      <CalendarEventsStyles>
        <Content>
          {!calEvents.length ? (
            <div className='text-center no-events-message'>
              <h2 className='dynamic-h2'>No upcoming events at this time</h2>
              <h3 className='dynamic-h3'>Please check back soon!</h3>
            </div>
          ) : (
            <div className='calendar-events'>
              <div className='promo-header'>
                <div className='promo-image'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={'/images/display/opspark-hackathon-2023.png'}
                    width='100%'
                    height='auto'
                    style={{ objectFit: 'contain' }}
                    alt='Hackathon 2023'
                  />
                </div>
                <a
                  className='anchor right-arr-left'
                  target='_blank'
                  href='https://ospk.org/opspark-hackathon-2023'
                  rel='noreferrer'
                >
                  Buy tickets here
                </a>
              </div>
              <h1 className='dynamic-h1 primary-secondary text-center'>Upcoming Events</h1>
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
                      <div
                        className='event-description'
                        dangerouslySetInnerHTML={{ __html: calItem.description }}
                      />
                    )}
                    {calItem.location && (
                      <a
                        className='event-location anchor'
                        href={calItem.location}
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
          )}
        </Content>
      </CalendarEventsStyles>
    </Main>
  );
};

export default CalendarEvents;

const CalendarEventsStyles = styled.div`
  .no-events-message {
    padding: 1rem 0;
  }

  .promo-header {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .promo-image {
      img {
        max-width: 700px;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.5rem ${({ theme }) => theme.alpha.fg50};
      }
    }
    a {
      margin-top: 0.5rem;
    }
  }
  .calendar-events {
    display: flex;
    align-content: center;
    flex-flow: column wrap;
    gap: 2rem;
    margin-top: 2rem;

    border-radius: 0.5rem;
  }

  .calendar-event {
    box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg50};
    text-align: center;
    width: 700px;
    max-width: 100%;
    border-radius: 0.5rem;
    padding: 1rem;
    backdrop-filter: blur(2px);
    background: ${({ theme }) => `
      linear-gradient(135deg,
        ${theme.alpha.fg25} -50%,
        ${theme.alpha.bg25} 25%,
        ${theme.alpha.bg25} 75%,
        ${theme.alpha.fg25} 150%
      )
    `};
  }

  a {
    ${anchor};
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
    text-align: left;
    p {
      padding: 0.5rem 0;
    }

    ol,
    ul {
      padding-left: 2rem;
    }
  }
`;
