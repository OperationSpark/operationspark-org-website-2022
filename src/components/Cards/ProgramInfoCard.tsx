import Link from 'next/link';
import styled from 'styled-components';
import moment from 'moment';

import { ISessionRow } from '@this/data/types/schedule';
import { ICourses } from '@this/data/types/programs';
import PlainCard from './PlainCard';

type ProgramInfoCardProps = {
  nextSessionDates: { [key: string]: ISessionRow };
  nextInfoSessionDate: string | null;
} & ICourses;

const ProgramInfoCard = ({
  title,
  length,
  cost,
  description,
  infoMessage,
  preReqs,
  nextInfoSessionDate,
  nextSessionDates,
}: ProgramInfoCardProps) => {
  return (
    <ProgramInfoCardStyles>
      <PlainCard
        className='program-card _progress'
        id={title.toLowerCase().split(' ').join('-')}
        shadow='alternate'
        key={title}
      >
        <div className='program-card-body'>
          <div className='program-card-body-left'>
            <h2 className='dynamic-h2 primary-secondary program-title'>{title}</h2>
            <div className='program-info-row'>
              {cost && (
                <div className='program-info'>
                  <p className='dynamic-txt'>
                    <b>Cost</b> <br />
                    <i>{cost}</i>
                  </p>
                </div>
              )}
              <div className='program-info'>
                <p className='dynamic-txt'>
                  <b>Length</b> <br />
                  <i>{length}</i>
                </p>
              </div>
              {preReqs && (
                <div className='program-info'>
                  <p className='dynamic-txt' style={{ paddingBottom: '0.5rem' }}>
                    <b>Prerequisites</b> <br />
                    <i>{preReqs}</i>
                  </p>
                </div>
              )}
            </div>
            {nextSessionDates[title] && !infoMessage && (
              <div>
                <p className='dynamic-txt primary-secondary program-next-start program-info'>
                  <b className='dim'>Next start date:</b>
                </p>
                <p className='dynamic-txt primary-secondary program-next-start'>
                  <b>{moment(nextSessionDates[title].start).format('MMMM DD, yyyy')}</b>
                </p>
              </div>
            )}
            {infoMessage && (
              <div>
                <div>
                  <p className='dynamic-txt'>
                    <b className='dim'>Next info session:</b>
                  </p>
                  <p className='dynamic-txt primary-secondary indent'>
                    <b>{nextInfoSessionDate}</b>
                  </p>
                </div>
                <p
                  className='dynamic-txt program-next-start primary-secondary'
                  style={{ paddingTop: '0.5rem' }}
                >
                  <Link href='/infoSession'>
                    <a className='anchor right-arr-left'>Sign up here</a>
                  </Link>
                </p>
              </div>
            )}
          </div>
          <div className='program-card-body-right'>
            {description.map((desc) => (
              <p key={desc} className='dynamic-txt program-desc'>
                {desc}
              </p>
            ))}
            {infoMessage && (
              <p className='dynamic-txt info-message'>
                <b>{infoMessage}</b>
              </p>
            )}
          </div>
        </div>
      </PlainCard>
    </ProgramInfoCardStyles>
  );
};

export default ProgramInfoCard;

export const ProgramInfoCardStyles = styled.div`
  .program-card {
    margin-bottom: 2rem;
    .program-title {
      padding-bottom: 0rem;
    }
    .program-card-body {
      display: flex;
      grid-gap: 1rem;
      .program-card-body-left {
        width: 25%;
        display: flex;
        flex-flow: column;
        .program-info-row {
          padding-bottom: 0.4rem;
          .program-info {
            padding: 0.4rem 0;
            color: ${({ theme }) => (theme.isLightMode ? theme.grey[600] : theme.grey[400])};
            font-size: 1rem;

            p {
              width: fit-content;
            }
            b {
              color: ${({ theme }) => (theme.isLightMode ? theme.grey[800] : theme.grey[200])};
            }
          }
        }
      }
      .program-card-body-right {
        display: flex;
        flex-flow: column;
        justify-content: center;
        width: 75%;
        .program-desc {
          padding: 1rem 0;
          :first-of-type {
            padding-top: 0;
          }
          :last-of-type {
            padding-bottom: 0;
          }
        }
        .info-message {
          color: ${({ theme }) => (theme.isLightMode ? theme.magenta[400] : theme.magenta[200])};
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .program-card {
      width: 100%;
      .program-title {
        padding-bottom: 0.5rem;
        text-align: center;
      }
      .program-card-body {
        flex-flow: column;
        .program-card-body-left,
        .program-card-body-right {
          width: 100%;
        }
        .program-card-body-left {
          display: flex;
          justify-content: center;
        }
        .program-info-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

          grid-gap: 0.5rem;
          grid-auto-flow: column row;

          justify-items: center;
          .program-info {
            /* grid-column: auto / auto; */
            padding: 0 0;
            p {
              padding: 0;
              text-align: center;
            }
          }
        }
      }
    }
  }
`;
