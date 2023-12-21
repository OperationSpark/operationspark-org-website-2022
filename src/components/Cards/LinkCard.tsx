import Link from 'next/link';
import styled from 'styled-components';
import { SlashDivider } from '@this/components/Elements/SlashDivider';
import { cardShadow } from '@this/src/theme/styled/mixins/shadows';

export const LinkCardStyles = styled.div`
  width: 50%;
  padding: 0.75rem;

  .card {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    height: 100%;
    font-weight: 500;
    background: ${({ theme }) => theme.alpha.bg};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 0.25rem;
    ${cardShadow}
  }

  .card-main {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    height: 100%;
    padding: 1.5rem;
    h3,
    a {
      color: ${({ theme }) => (theme.isLightMode ? theme.primary[700] : theme.secondary[400])};
    }

    h3 {
      font-weight: 700;
      line-height: 1em;
      padding-bottom: 1.5rem;
    }
    p {
      padding-bottom: 1.5rem;
      height: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0.5rem 0;
  }
`;

export interface LinkCardProps {
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
}

const LinkCard = ({ title, description, linkText, linkUrl }: LinkCardProps) => {
  return (
    <LinkCardStyles>
      <div className='card'>
        <div className='card-main'>
          <h3 className='dynamic-h3'>{title}</h3>
          <p className='dynamic-txt'>{description}</p>

          {linkUrl && linkText && (
            <Link href={linkUrl}>
              <a className='anchor right-arr-left' title={linkText} aria-label={linkText}>
                {linkText}
              </a>
            </Link>
          )}
        </div>
        <SlashDivider
          style={{
            borderBottom: 'none',
            borderRadius: '0 0 0.5rem 0.5rem',
          }}
        />
      </div>
    </LinkCardStyles>
  );
};

export default LinkCard;
