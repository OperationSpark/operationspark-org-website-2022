import LogoLink from '@this/components/Elements/LogoLink';
import { SlashDivider } from '@this/components/Elements/SlashDivider';
import { cardShadow } from '@this/src/theme/styled/mixins/shadows';
import styled from 'styled-components';

export const LogoCardStyles = styled.div`
  padding: 1rem;
  padding-bottom: 0;

  .card {
    width: 100%;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.fg};
    overflow: hidden;
    border-radius: 0.25rem;
    ${cardShadow}
  }
  .card-main {
    padding: 2rem;
    padding-bottom: 1rem;
    font-weight: 500;
  }

  .card-quote {
    padding-bottom: 2rem;
  }
  .card-user {
    font-size: 0.9rem;
  }
  .card-role {
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
    .card-main {
      padding: 1.5rem;
    }
  }
`;

interface LogoCardProps {
  quote?: string;
  name?: string;
  role?: string;
  logoHref?: string;
  logoSrc?: string;
  logoAlt?: string;
  newTab?: boolean;
}

const LogoCard = ({ quote, name, role, logoHref, logoSrc, logoAlt, newTab }: LogoCardProps) => {
  return (
    <LogoCardStyles>
      <div className='card'>
        <div className='card-main'>
          <p className='dynamic-txt card-quote'>{quote}</p>
          <div className='row-between'>
            <div className='card-user source-code'>
              <p className='card-user-name'>{name}</p>
              <p className='card-role'>{role}</p>
            </div>
            <LogoLink
              src={logoSrc ?? ''}
              href={logoHref ?? ''}
              alt={logoAlt ?? ''}
              newTab={newTab ?? false}
            />
          </div>
        </div>
        <SlashDivider style={{ borderBottom: 'none' }} />
      </div>
    </LogoCardStyles>
  );
};

export default LogoCard;
