import { FC } from 'react';
import styled from 'styled-components';

import {
  HiMiniChevronRight as ChevronRightIcon,
  HiMiniInformationCircle as InfoIcon,
} from 'react-icons/hi2';

type TeacherTrainingCardProps = {
  level: number;
  levelColor: 'green' | 'yellow';
  levelName: string;
  courseName: string;
  ibcCode: string;
  ibcName: string;
  ibcNote?: string;
  about: string;
  format: string;
  startDate: string;
  endDate: string;
  days: string;
  startTime: string;
  endTime: string;
  prerequisites: string;
  prerequisiteNote?: string;
};

const TeacherTrainingCard: FC<TeacherTrainingCardProps> = (props) => {
  return (
    <TeacherTrainingCardStyles
      id={`teacher-training-level-${props.level}`}
      className={`teacher-training-card-${props.levelColor}`}
    >
      <div className='card-header'>
        <h3 className='course-level-number'>Level {props.level}</h3>
        <h4 className={`course-level-name course-level-name-${props.levelColor}`}>
          {props.levelName}
        </h4>
        <div className='course-name'>{props.courseName}</div>
        <code className='course-ibc-code'>({props.ibcCode})</code>
      </div>

      <div className='card-section'>
        <h3 className='card-subheader text-center'>About</h3>
        <p>{props.about}</p>

        <hr />

        <p>
          <b>IBC: </b> {props.ibcName}
        </p>
        {props.ibcNote && <p className='note'>{props.ibcNote}</p>}
      </div>

      <div className='card-section card-section-with-subsections'>
        <h3 className='card-subheader text-center'>Summer 2025 Training Info</h3>

        <div className='training-datetime'>
          <div className='training-date'>
            {props.startDate} - {props.endDate}
          </div>
          <div className='training-time-days'>
            <div className='training-time'>
              {props.startTime} - {props.endTime}
            </div>
            <div className='training-days'>{props.days}</div>
          </div>
        </div>

        <div className='flex-column gap-4'>
          <div className='card-subsection'>
            <h3 className='card-subheader text-center'>Format</h3>
            <p>{props.format}</p>
          </div>

          <div className='card-subsection'>
            <h3 className='card-subheader text-center'>Prerequisites</h3>
            <p className='prerequisites'>{props.prerequisites}</p>
            {props.prerequisiteNote && <p className='note'>{props.prerequisiteNote}</p>}
          </div>
        </div>
      </div>
      <div className='flex-row gap-2'>
        <a
          className='training-card-info-link'
          href={`/programs/highschool/teacherTraining/info/level-${props.level}`}
          data-test-id={`teacher-training-info-${props.level}`}
        >
          <InfoIcon className='info-icon' size={24} /> More Information
        </a>
        <a
          className='training-card-apply-link'
          href={`/programs/highschool/teacherTraining/register/level-${props.level}`}
          data-test-id={`teacher-training-register-${props.level}`}
        >
          Register for Level {props.level}
          <span className='register-icon'>
            <ChevronRightIcon size={24} strokeWidth={1.5} />
          </span>
        </a>
      </div>
    </TeacherTrainingCardStyles>
  );
};

export default TeacherTrainingCard;

const TeacherTrainingCardStyles = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  gap: 1rem;
  background: ${({ theme }) => theme.bgHover};
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 4px 0px inset ${({ theme }) => theme.alpha.fg25};
  max-width: 40rem;
  flex: 1 1 28rem;
  margin: 0 auto;

  &.teacher-training-card-green {
    box-shadow: 0 0 0.5rem 1px inset ${({ theme }) => theme.rgb('green', 0.5, -10)};
    background: ${({ theme }) => theme.rgb('green', 0.05, -10)};
    --level-color: ${({ theme }) => theme.asRgb('green', -10)};
  }

  &.teacher-training-card-yellow {
    box-shadow: 0 0 0.5rem 1px inset ${({ theme }) => theme.rgb('yellow.800', 1, -4)};
    background: ${({ theme }) => theme.rgb('yellow.800', 0.05, -4)};
    --level-color: ${({ theme }) => theme.asRgb('yellow.800', -4)};
  }

  .card-header {
    font-size: 1.4rem;
    font-weight: 900;
    text-align: center;
    display: flex;
    flex-flow: column;
    gap: 0.5rem;
    .course-ibc-code {
      font-size: 0.75rem;
      font-weight: 400;
      color: ${({ theme }) => theme.alpha.fg50};
    }
    .course-level-number {
      font-size: 1.75rem;
      font-weight: 900;
    }
    .course-level-name {
      font-size: 1rem;
      font-weight: 700;
      border-radius: 0.25rem;
      width: fit-content;
      margin: 0 auto;
      padding: 0.25rem 0.5rem;
      line-height: 1;
    }
    .course-level-name-yellow {
      ${({ theme }) => {
        const yellow = theme.yellow[900];
        return `
          color: ${yellow};
          box-shadow: 0 0 1px 1px inset ${yellow};
        `;
      }};
    }
    .course-level-name-green {
      ${({ theme }) => {
        const yellow = theme.green[theme.isLightMode ? 800 : 400];
        return `
          color: ${yellow};
          box-shadow: 0 0 1px 1px inset ${yellow};
        `;
      }};
    }
    .course-name {
      font-size: 1.25rem;
      font-weight: 500;
    }
  }

  .card-section {
    background: ${({ theme }) => theme.bgHover};
    box-shadow: 0 0 1px 1px rgba(var(--level-color), 0.5);
    color: ${({ theme }) => theme.alpha.fg};
    padding: 1rem;
    border-radius: 0.5rem;

    hr {
      margin: 0.5rem 0;
      border-color: ${({ theme }) => theme.alpha.fg25};
      border-width: 0.5px;
    }

    .note {
      font-size: 0.8rem;
      font-style: italic;
      color: ${({ theme }) => theme.alpha.fg50};
      border-left: 0.25rem solid ${({ theme }) => theme.alpha.fg25};
      padding-left: 0.5rem;
    }

    &.card-section-with-subsections {
      box-shadow: 0 0 1px 1px rgba(var(--level-color), 0.5);
      padding: 0.5rem;
    }
  }

  .card-subsection {
    background: ${({ theme }) => theme.bgHover};
    box-shadow: 0 0 1.5px 0px inset ${({ theme }) => theme.alpha.fg50};
    color: ${({ theme }) => theme.alpha.fg};
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .training-datetime {
    display: flex;
    flex-flow: column;
    gap: 0.25rem;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 700;
    padding: 1rem;
    box-shadow: 0 0 1.5px 0px inset ${({ theme }) => theme.alpha.fg50};
    background: ${({ theme }) => theme.bg};
    border-radius: 0.5rem;
    width: fit-content;
    margin: 1rem auto;
  }

  .training-time-days {
    display: flex;
    flex-flow: row nowrap;
    gap: 0.25rem;

    .training-days {
      font-size: 0.9rem;
      font-weight: 500;
      line-height: 1.5;
      margin-left: 1rem;
    }
  }

  .card-subheader {
    font-size: 1.2rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
  }

  .training-card-info-link {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 0.25rem;
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.alpha.fg};
    text-decoration: none;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.secondary[0]};
    color: ${({ theme }) => (theme.isLightMode ? theme.fg : theme.bg)};
    box-shadow: 0 0 1.5px 0px inset ${({ theme }) => theme.alpha.fg50};
    transition: background 0.25s, color 0.25s;
    &:hover {
      background: ${({ theme }) => theme.secondary[200]};
    }
    &:active {
      background: ${({ theme }) => theme.secondary[600]};
    }
  }

  .training-card-apply-link {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    font-size: 1rem;
    font-weight: 700;
    flex: 1;
    color: ${({ theme }) => theme.alpha.fg};
    text-decoration: none;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.primary[theme.isLightMode ? 700 : 500]};
    color: ${({ theme }) => theme.white};
    box-shadow: 0 0 0px 2px inset ${({ theme }) => theme.primary[theme.isLightMode ? 700 : 500]};
    transition: background 0.25s, color 0.25s;
    .register-icon {
      transition: all 225ms;
      display: flex;
      align-items: center;
    }
    &:hover {
      background: ${({ theme }) => theme.primary[theme.isLightMode ? 300 : 800]};
      .register-icon {
        transform: translateX(0.25rem);
      }
    }
    &:active {
      background: ${({ theme }) => theme.primary[600]};
    }
  }

  .prerequisites {
    font-weight: 500;
    text-align: center;
    margin: 0.5rem 0;
    margin-bottom: 1rem;
  }
`;
