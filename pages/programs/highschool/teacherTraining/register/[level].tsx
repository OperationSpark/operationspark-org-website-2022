import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import styled from 'styled-components';

import Content from '@this/components/layout/Content';
import Main from '@this/components/layout/Main';
import { TeacherTraining, TeacherTrainingInfo } from '@this/data/types/teacherTraining';
import { getStaticAsset } from '@this/pages-api/static/[asset]';
import NeumorphismListCard from '@this/src/components/Cards/NeumorphismListCard';
import { BgImg } from '@this/src/components/Elements';

type TeacherTrainingRegistrationProps = {
  info: TeacherTrainingInfo;
  formFields: TeacherTraining['registrationFields'];
};

const TeacherTrainingRegistration: NextPage<TeacherTrainingRegistrationProps> = (props) => {
  const { info, formFields } = props;

  const { title, season, level, levelName } = info;

  console.log({
    info,
    formFields,
  });

  return (
    <Main style={{ paddingTop: 0 }}>
      <TeacherTrainingRegisterStyles>
        <BgImg src='/images/display/abstract-space.webp' height='24rem'>
          <Content className='page-header-container'>
            <div className='page-header-content'>
              <h1 className='dynamic-xl'>Register</h1>
              <h2 className='fw-700 dynamic-h2'>
                {title} {season}
              </h2>
              <h3 className='fw-700 dynamic-h3 page-header-dim'>
                Level {level} ({levelName})
              </h3>
              <h3 className='fw-500 dynamic-h4 page-header-dim'>{info.subtitle}</h3>
            </div>
          </Content>
        </BgImg>

        <Content>
          <div className='flex-row flex-center'>
            <NeumorphismListCard
              title='Details'
              center
              maxWidth='800px'
              items={[
                <DetailsTable key='details'>
                  <div className='details-row'>
                    <div className='details-label'>IBC</div>
                    <div className='details-value'>
                      {info.levelName} {info.subtitle} | Level {info.level}
                    </div>
                  </div>
                  <div className='details-row'>
                    <div className='details-label'>Prerequisites</div>
                    <div className='details-value'>{info.prerequisites}</div>
                  </div>
                  <div className='details-row'>
                    <div className='details-label'>Format</div>
                    <div className='details-value'>{info.format.type}</div>
                  </div>
                  <div className='details-row'>
                    <div className='details-label'>Cost</div>
                    <div className='details-value'>
                      {info.cost.amount} per {info.cost.per}
                      {info.cost.includeTesting && ' (includes testing)'}
                    </div>
                  </div>
                  <div className='details-row'>
                    <div className='details-label'>Deadlines</div>
                    <div className='details-value'>
                      {`The priority deadline for guaranteed availability is `}
                      <span className='details-date'>{info.registration.priorityDate}</span>
                      {`. The final deadline to register is `}
                      <span className='details-date'>{info.registration.deadline}</span>
                      {`, or when we reach the seat limit, whichever comes first.`}
                    </div>
                  </div>
                  <div className='details-row'>
                    <div className='details-label'>Dates</div>
                    <div className='details-value'>
                      <div className='flex-column'>
                        <div className='fw-700'>
                          {info.times.startDate} - {info.times.endDate}
                        </div>
                        <div className='fw-700 flex-row gap-2 flex-align-center'>
                          <span>
                            {info.times.startTime} - {info.times.endTime}
                          </span>

                          <span className='fs-75 lh-1 text-subtle-2'>{info.times.days}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex-row flex-center'>
                    <a
                      href={`/programs/highschool/teacherTraining/info/level-${level}`}
                      className='registration-button'
                    >
                      See all details
                    </a>
                  </div>
                </DetailsTable>,
              ]}
            />
          </div>
        </Content>

        <Content className='flex-column flex-align-center'>
          <NeumorphismListCard
            title='Registration Form'
            subtitle='Please complete a separate form for each participant'
            maxWidth='800px'
            items={[
              <div key='registration-form flex-column gap-4'>
                <div>
                  {`Please include any special instructions for Invoices as required by the school or district. Invoices for training fees will be sent one month before training starts. Cancellations for a full refund will be allowed until the invoicing date, `}
                  <span className='date-value'>June 10, 2025</span>
                  {`. Any registrations received after this date will be `}
                  <i>non-refundable.</i>
                </div>
                <hr style={{ margin: '2rem 0' }} />
                <div className='TODO'>Registration Form</div>
              </div>,
            ]}
            center
          />
        </Content>
      </TeacherTrainingRegisterStyles>
    </Main>
  );
};

export default TeacherTrainingRegistration;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const level = params?.level as string;
  const levelNum = level ? parseInt(level.replaceAll(/\D/g, '')) : 1;
  const levelInfoData = await getStaticAsset('teacherTraining', 'info');
  const info = levelInfoData[`${levelNum}`] as TeacherTrainingInfo;
  const formFields = await getStaticAsset('teacherTraining', 'registrationFields');

  return { props: { info, formFields } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { level: 'level-1' } }, { params: { level: 'level-2' } }],
    fallback: false,
  };
};

const TeacherTrainingRegisterStyles = styled.div`
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

const DetailsTable = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
  .details-row {
    display: grid;
    grid-template-columns: 125px 1fr;
    gap: 1rem;
    box-shadow: 0 0 4px 1px ${({ theme }) => theme.rgb('fg', 0.1)};
    background: ${({ theme }) => theme.rgb('bg', 1)};
    border-radius: 0.5rem;
  }

  .details-label,
  .details-value {
    padding: 0.5rem;
  }
  .details-label {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.rgb('fg', 0.75)};
    background: ${({ theme }) => theme.rgb('bg', 0.5, theme.isLightMode ? -2 : 4)};
    border-radius: 0.5rem 0 0 0.5rem;
  }
  .details-value {
    border-radius: 0 0.5rem 0.5rem 0;
  }
  .details-date {
    font-weight: 600;
    font-size: 0.9em;
    line-height: 1;
    padding: 0.1em 0.25em;
    color: ${({ theme }) =>
      theme.isLightMode ? theme.rgb('primary') : theme.rgb('secondary.600', 1)};
    background: ${({ theme }) =>
      theme.isLightMode ? theme.rgb('primary', 0.1) : theme.rgb('secondary.600', 0.1)};
    box-shadow: 0 0 1px 0px inset
      ${({ theme }) =>
        theme.isLightMode ? theme.rgb('primary', 0.5) : theme.rgb('secondary.600', 0.5)};
    border-radius: 0.25rem;
  }
`;
