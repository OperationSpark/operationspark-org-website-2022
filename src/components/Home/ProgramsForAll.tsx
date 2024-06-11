import styled from 'styled-components';

import IconBtnCard from '@this/components/Cards/IconBtnCard';
import { BgImg } from '@this/components/Elements';
import { SlashDivider } from '@this/components/Elements/SlashDivider';
import CareersForAll from '@this/components/Home/CareerForAll';
import Content from '@this/components/layout/Content';
import { IProgramsForAll } from '@this/data/types/home';

const ProgramsForAll = ({
  title,
  description,
  programs,
  id,
  className,
}: IProgramsForAll & {
  id?: string;
  className?: string;
}) => {
  return (
    <ProgramsForAllStyles id={id} className={className}>
      <BgImg src='/images/group-photo.webp' height='40rem'>
        <Content>
          <div className='top-content'>
            {title.map((text) => (
              <h1 key={text} className='dynamic-xl title text-shadow'>
                {text}
              </h1>
            ))}
            <div className='rounded-card bg-subtle-dark'>
              {description.map((text) => (
                <p key={text} className='dynamic-txt'>
                  {text}
                </p>
              ))}
            </div>
          </div>
        </Content>
      </BgImg>

      <Content className='program-cards'>
        {programs.map((program) => (
          <IconBtnCard key={program.title} {...program} />
        ))}
      </Content>
      <Content className='career-for-all'>
        <h1 className='dynamic-h1'>THERE&apos;S A CAREER FOR EVERYONE!</h1>
      </Content>

      <Content className='bottom-content'>
        <CareersForAll />
      </Content>

      <SlashDivider />
    </ProgramsForAllStyles>
  );
};

export default ProgramsForAll;

const ProgramsForAllStyles = styled.div`
  .top-content {
    padding: 4rem 0;

    h1 {
      color: ${({ theme }) => theme.secondary[400]};
      :last-of-type {
        padding-bottom: 1rem;
      }
      :first-of-type {
        line-height: 1.25em;
      }
    }
  }
  .bottom-content,
  .program-cards,
  .career-for-all {
    padding-top: 0;
    padding-bottom: 0;
  }

  .program-cards {
    display: flex;
    position: relative;
    top: -8rem;
    z-index: 1;
  }

  .career-for-all {
    position: relative;
    top: -4rem;
    .dynamic-h1 {
      color: ${({ theme }) => (theme.isLightMode ? theme.primary[0] : theme.secondary[0])};
    }
  }

  @media screen and (max-width: 768px) {
    .program-cards {
      flex-flow: column;
    }
    .top-content {
      padding: 4rem 0;
    }
  }
`;
