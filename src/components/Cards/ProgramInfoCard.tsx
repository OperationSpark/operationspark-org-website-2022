import Link from 'next/link';
import styled from 'styled-components';
import moment from 'moment';

import { ISessionRow } from '@this/data/types/schedule';
import { ICourses } from '@this/data/types/programs';
import PlainCard from './PlainCard';
import { cardShadowLtr } from '@this/src/theme/styled/mixins/shadows';

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
        key={title}
      >
        <div className='program-card-body'>
          <div className='program-card-body-left'>
            <h2 className='dynamic-h2 primary-secondary program-title'>{title}</h2>
            <div className='program-info-row'>
              {cost && (
                <div className='program-info'>
                  <p>
                    <b>Cost</b>
                    <i>{cost}</i>
                  </p>
                </div>
              )}
              <div className='program-info'>
                <p>
                  <b>Length</b>
                  <i>{length}</i>
                </p>
              </div>
              {preReqs && (
                <div className='program-info'>
                  <p>
                    <b>Prerequisites</b>
                    <i>{preReqs}</i>
                  </p>
                </div>
              )}
              {infoMessage && (
                <div className='program-info next-session'>
                  <p>
                    <b>Next info session</b>
                    <i>{nextInfoSessionDate}</i>
                  </p>
                </div>
              )}
              {nextSessionDates[title] && !infoMessage && (
                <div className='program-info next-session'>
                  <p>
                    <b>Next start date</b>
                    <i>{moment(nextSessionDates[title].start).format('MMMM DD, yyyy')}</i>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className='program-card-body-right'>
            {description.map((desc) => (
              <p key={desc} className='dynamic-txt program-desc'>
                {desc}
              </p>
            ))}
            {infoMessage && (
              <p className='dynamic-txt info-message flex-col-between'>
                <b>{infoMessage}</b>
                <Link href='/infoSession'>
                  <a className='anchor right-arr-left'>Sign up here</a>
                </Link>
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
  }
  .program-title {
    padding-bottom: 0rem;
  }
  .program-card-body {
    display: flex;
    grid-gap: 1rem;
  }
  .program-card-body-left {
    position: relative;
    width: 25%;
    display: flex;
    flex-flow: column;
    grid-gap: 0.5rem;
  }
  .flex-col-between {
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
    height: 100%;
  }
  .program-card-body-right {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
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
  .program-info-row {
    display: flex;
    flex-flow: column;
    grid-gap: 0.75rem;
  }
  .program-info {
    color: ${({ theme }) => (theme.isLightMode ? theme.grey[600] : theme.grey[400])};
    font-size: 1rem;
    line-height: 1.25em;
    p {
      display: flex;
      flex-flow: column;
      * {
        width: 100%;
      }
    }
    b {
      color: ${({ theme }) => (theme.isLightMode ? theme.grey[800] : theme.grey[200])};
    }
    i {
      font-size: 0.9rem;
    }
  }
  .program-info.next-session {
    p {
      width: fit-content;
      border-radius: 0.25rem;
      padding: 0.75rem;
      margin-left: -0.75rem;
      margin-bottom: -0.75rem;
      ${cardShadowLtr}
      i {
        font-weight: bold;
        color: ${({ theme }) => (theme.isLightMode ? theme.primary[0] : theme.secondary[0])};
      }
    }
  }

  @media screen and (max-width: 768px) {
    .program-card {
      width: 100%;
    }
    .program-title {
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
      }
    }
    .program-info-row {
      display: flex;
      flex-flow: row wrap;
      grid-gap: 0.5rem;
      justify-content: space-around;
    }
    .program-info {
      flex: 140px;
      display: flex;
      justify-content: center;
      width: 100%;
      min-width: fit-content;
      border-radius: 0.25rem;
      line-height: 1.25em;
      padding: 0.25rem;
      min-width: 6rem;
      box-shadow: 0 0 1px ${({ theme }) => theme.alpha.fg50} inset;
      :last-child {
        flex: 100%;
      }
      p {
        text-align: center;
        justify-content: space-between;
      }
      i {
        align-self: flex-end;
      }
    }
    .program-info.next-session {
      width: 100%;
      ${cardShadowLtr}
      p {
        box-shadow: none;
        border-radius: 0.25rem;
        padding: 0.25rem;
        margin-left: 0;
        margin-bottom: 0;
        i {
          font-weight: bold;
          color: ${({ theme }) => (theme.isLightMode ? theme.primary[0] : theme.secondary[0])};
        }
      }
    }
  }
`;
