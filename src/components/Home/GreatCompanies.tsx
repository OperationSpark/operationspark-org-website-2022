import styled, { useTheme } from 'styled-components';

import LogoCard from '@this/components/Cards/LogoCard';
import { BgImg } from '@this/components/Elements';
import NavLink from '@this/components/Navbar/elements/NavLink';
import Content from '@this/components/layout/Content';
import { IHome } from '@this/data/types/home';

const GreatCompanies = ({ title, description }: IHome['greatCompanies']) => {
  const theme = useTheme();
  /** Remove once page is created */
  const FEAT_STUDENT_OUTCOMES = false;
  return (
    <BgImg src='/images/grad-conference-table.webp' height='auto'>
      <GreatCompaniesStyles className='_progress' id='companies'>
        <Content>
          {title.map((text) => (
            <h1 key={text} className='dynamic-xl text-shadow'>
              {text}
            </h1>
          ))}

          <div className='row-between'>
            <div className='outcomes-description bg-subtle-dark rounded-card'>
              {description.map((text) => (
                <p key={text} className='dynamic-txt'>
                  {text}
                </p>
              ))}
              {FEAT_STUDENT_OUTCOMES && (
                <NavLink href='#' className='info'>
                  See Student Outcomes
                </NavLink>
              )}
            </div>
            <div className='logo-card'>
              <LogoCard
                name='Tim Blackmon'
                role='CIO, Hired 6 grads at Mumms Software'
                quote={
                  'Operation Spark is a true disruptor of the classical software engineering education domain. Their graduates posess real-world experience in todays modern technologies. For this reason, we have had great success hiring their grads.'
                }
                logoSrc={`/images/logos/supporters/mumms-software-${theme.colorMode}.png`}
                logoHref='https://mumms.com/'
                logoAlt='Mumms Software'
                newTab={true}
              />
            </div>
          </div>
        </Content>
      </GreatCompaniesStyles>
    </BgImg>
  );
};

export default GreatCompanies;

const GreatCompaniesStyles = styled.div`
  h1 {
    color: ${({ theme }) => theme.secondary[400]};
  }
  .outcomes-description {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;
    color: white;
    width: 40%;
    height: fit-content;
    margin-top: auto;
    margin-bottom: auto;
  }
  .logo-card {
    width: 60%;
  }
  @media screen and (max-width: 768px) {
    .outcomes-description,
    .logo-card {
      width: 100%;
    }
    .outcomes-description {
      margin-bottom: 1rem;
    }
    .info {
      margin: 2rem 0;
    }
    .logo-card {
      a {
        padding-top: 2rem;
        align-self: flex-end;
      }
    }
  }
`;
