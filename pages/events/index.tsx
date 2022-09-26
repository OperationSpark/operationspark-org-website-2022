import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import moment from 'moment';
import { Content, Main } from '@this/src/components/layout';
import { getCalendarEvents, CalendarEventItem } from '@this/pages-api/calendar/events';

type CalendarEventProps = {
  calEvents: CalendarEventItem[];
};

const Description = ({ text }: { text: string }) => {
  const [parsedText, setParsedText] = useState<string[]>([]);
  useEffect(() => {
    const el = document.createElement('div');
    el.style.whiteSpace = 'pre';
    el.innerHTML = text || '';
    const newText = el.innerText.split('\n');

    setParsedText(newText);
  }, [text]);

  return (
    <div className='event-description'>
      {parsedText.map((p, i) => (
        <p key={`${p}-${i}`}>{p}</p>
      ))}
    </div>
  );
};

const CalendarEvents: NextPage<CalendarEventProps> = ({ calEvents }) => {
  return (
    <Main>
      <CalendarEventsStyles>
        <Content>
          <h1 className='dynamic-h1 primary-secondary text-center'>Upcoming Events</h1>
          {!calEvents.length ? (
            <div className='text-center no-events-message'>
              <h2 className='dynamic-h2'>No upcoming events at this time</h2>
              <h3 className='dynamic-h3'>Please check back soon!</h3>
            </div>
          ) : (
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
                    {calItem.description && <Description text={calItem.description} />}
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

export const getServerSideProps: GetServerSideProps<CalendarEventProps> = async () => {
  try {
    const calEvents = await getCalendarEvents();
    return { props: { calEvents } };
  } catch (err) {
    console.error(err);
    return { props: { calEvents: [] } };
  }
};

const CalendarEventsStyles = styled.div`
  .no-events-message {
    padding: 1rem 0;
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
