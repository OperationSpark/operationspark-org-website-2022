import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';

import { BiDollar as CostIcon } from 'react-icons/bi';
import { CiClock2 as ClockIcon } from 'react-icons/ci';
import {
  FaCheck as CheckIcon,
  FaFileContract as ContractIcon,
  FaUserGraduate as OutcomesIcon,
} from 'react-icons/fa6';
import {
  HiMiniChevronRight as ChevronRightIcon,
  HiOutlineBuildingOffice as OfficeIcon,
  HiOutlineBookOpen as SummaryIcon,
} from 'react-icons/hi2';
import { MdChecklist as PrerequisitesIcon } from 'react-icons/md';

import { SiZoom as ZoomIcon } from 'react-icons/si';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { TeacherTrainingInfo } from '@this/data/types/teacherTraining';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import NeumorphismListCard from '@this/src/components/Cards/NeumorphismListCard';
import { BgImg } from '@this/src/components/Elements';
import GridList from '@this/src/components/Elements/GridList';

const getLocationTypeIcons = (location: TeacherTrainingInfo['format']['type']) => {
  if (location === 'Hybrid') {
    return [ZoomIcon, OfficeIcon];
  }
  if (location === 'Online') {
    return [ZoomIcon];
  }

  return [OfficeIcon];
};
const Level1Info: NextPage<TeacherTrainingInfo> = (props) => {
  const {
    title,
    season,
    level,
    levelName,
    summary,
    format,
    times,
    cost,
    registration,
    prerequisites,
    outcomes,
    nda,
  } = props;

  return (
    <Main style={{ paddingTop: 0 }}>
      <Level1InfoStyles>
        <BgImg src='/images/display/abstract-space.webp' height='24rem'>
          <Content className='page-header-container'>
            <div className='page-header-content'>
              <h1 className='dynamic-xl'>{title}</h1>
              <h2 className='fw-700 dynamic-h2'>{season}</h2>
              <h3 className='fw-500 dynamic-h3 page-header-dim'>
                Level {level} | {levelName}
              </h3>
            </div>
          </Content>
        </BgImg>

        <Content className='flex-column gap-4'>
          <NeumorphismListCard
            title='Summary'
            center
            Icon={SummaryIcon}
            items={[
              <p key='summary' className='dynamic-txt'>
                {summary}
              </p>,
            ]}
          />

          <NeumorphismListCard
            title='Format'
            subtitle={format.type}
            Icon={getLocationTypeIcons(format.type)}
            items={[
              <p key='format' className='dynamic-txt'>
                {format.description}
              </p>,
            ]}
            center
          />

          <div className='flex-row flex-wrap gap-4'>
            <div className='flex-400'>
              <NeumorphismListCard
                title='When'
                color='blue'
                Icon={ClockIcon}
                center
                items={[
                  <div key={times.startDate} className='dynamic-h4'>
                    {times.startDate} - {times.endDate}
                  </div>,
                  <div key={times.days} className='flex-row gap-4 flex-center'>
                    <div key={times.startDate} className='dynamic-h4'>
                      {times.startTime} - {times.endTime}
                    </div>
                    <span className='text-subtle-2 fs-75 lh-1 fit-content'>{times.days}</span>
                  </div>,
                  <div key={times.examDay} className='dynamic-h4'>
                    Exam: {times.examDay}
                  </div>,
                ]}
              />
            </div>
            <div className='flex-400'>
              <NeumorphismListCard
                title='Cost'
                Icon={CostIcon}
                center
                items={[
                  <div key={cost.amount} className='dynamic-h4'>
                    {cost.amount}
                    {cost.per ? ` per ${cost.per}` : ''}
                  </div>,
                  <div key={`include-testing-${cost.includeTesting}`} className='dynamic-h4'>
                    {cost.includeTesting ? 'Includes Testing' : 'Does not include Testing'}
                  </div>,
                ]}
              />
            </div>
          </div>

          <div className='flex-row gap-4'>
            <NeumorphismListCard
              title='Prerequisites'
              Icon={PrerequisitesIcon}
              center
              items={[
                <p key='prerequisites' className='dynamic-txt text-center'>
                  {prerequisites}
                </p>,
              ]}
            />
          </div>
        </Content>
        <Content className='flex-column gap-4'>
          <h2 className='dynamic-h2 text-center'>Training Outcomes</h2>
          {outcomes.map((outcome, i) => (
            <NeumorphismListCard
              key={i}
              title={outcome.title ?? 'Outcomes'}
              center
              Icon={OutcomesIcon}
              items={[
                <div key='outcomes' className='dynamic-txt flex-column gap-4'>
                  {outcome.description.map((desc, i) => (
                    <p key={i}>{desc}</p>
                  ))}
                </div>,
              ]}
            />
          ))}
        </Content>

        <Content>
          <NeumorphismListCard
            title={nda.title}
            subtitle={nda.subtitle}
            center
            Icon={ContractIcon}
            items={[
              <p key='summary' className='dynamic-txt'>
                {nda.description}
              </p>,
            ]}
          />
        </Content>
        <Content>
          <NeumorphismListCard
            title='Registration Process'
            subtitle={`Don't miss out!`}
            center
            Icon={CheckIcon}
            items={[
              <div className='flex-column gap-4'>
                <a
                  href={`/programs/highschool/teacherTraining/register/level-${level}`}
                  className='registration-button'
                >
                  Finalize registration Here
                  <ChevronRightIcon strokeWidth={2} size='1.25em' />
                </a>
                <p className='dynamic-txt'>
                  {`If the training fee will be covered by the school/district, the form should be completed for the teacher by a school/district administrator responsible for billing.`}
                </p>
                <p className='dynamic-txt'>
                  {`Please include any special instructions for Invoices as required by the school or district. Invoices for training fees will be sent one month before training starts. Cancellations for a full refund will be allowed until the invoicing date, ${registration.deadline}. Any registrations received after this date will be non-refundable.`}
                </p>
                <p className='dynamic-txt'>
                  {`The priority deadline for guaranteed availability is ${registration.priorityDate}. The final deadline to register is ${registration.deadline}, or when we reach the seat limit, whichever comes first.`}
                </p>
              </div>,
            ]}
          />
        </Content>

        <Content className='flex-row flex-center'>
          <NeumorphismListCard
            title='Contact'
            subtitle='Please get in touch with any questions'
            fit
            items={[
              <div>
                <GridList
                  interactive
                  items={[
                    <a href={`mailto:highschool@operationspark.org`}>
                      highschool@operationspark.org
                    </a>,
                    <a href={`tel:985-803-8895`}>985-803-8895</a>,
                  ]}
                />
              </div>,
            ]}
          />
        </Content>
      </Level1InfoStyles>
    </Main>
  );
};

export default Level1Info;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const level = params?.level as string;
  const levelNum = level ? parseInt(level.replaceAll(/\D/g, '')) : 1;
  const levelInfoData = await getStaticAsset('teacherTraining', 'info');
  const props = levelInfoData[`${levelNum}`] as TeacherTrainingInfo;

  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { level: 'level-1' } }, { params: { level: 'level-2' } }],
    fallback: false,
  };
};

const Level1InfoStyles = styled.div`
  .registration-button {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    background: ${({ theme }) => theme.rgb('primary')};
    color: ${({ theme }) => theme.rgb('white', 1)};
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.25rem;
    text-align: center;
    transition: 0.25s;
    margin: 1rem auto;
    &:hover {
      background: ${({ theme }) => theme.rgb('primary', 1, 5)};
      gap: 1rem;
    }

    &:active {
      background: ${({ theme }) => theme.rgb('primary', 1, -2)};
    }
  }
`;
