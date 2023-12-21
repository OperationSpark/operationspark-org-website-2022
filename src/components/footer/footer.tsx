// Logo sheet - https://docs.google.com/spreadsheets/d/1NomIolcAQIPH4c6SCdfuZsm0Geqv6vjvzKp8yohQ-kU/edit

import { motion } from 'framer-motion';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { useTheme } from 'styled-components';

import SocialNetworks from '@this/components/Elements/SocialNetworks';
import NavLink from '@this/components/Navbar/elements/NavLink';
import { ILogo } from '@this/data/types/logos';
import { SlashDivider } from '@this/elements/SlashDivider';

import { Img } from '@this/src/Typography/elements/Html';
import COEBox from './COEBox';
import Subscribe from './subscribe';

interface FooterProps {
  logos: ILogo[];
}

const Footer = ({ logos }: FooterProps) => {
  const theme = useTheme();
  const { pathname } = useRouter();

  const isInfoSessionPage = pathname.includes('infoSession');
  const isHighschoolPage = pathname.includes('highschool');

  return (
    <FooterStyles>
      <COEBox />
      {!isInfoSessionPage && !isHighschoolPage ? (
        <InfoSessionStyles>
          <h2 style={{ paddingBottom: '1rem' }} className='secondary dynamic-h2'>
            ATTEND A FREE INFO SESSION
          </h2>
          <NavLink className='info' href='/infoSession'>
            Register Now
          </NavLink>
        </InfoSessionStyles>
      ) : null}
      <SlashDivider />

      <Subscribe />
      <div className='content'>
        <SupportersStyles>
          <div>
            {!logos.length ? null : <h1 className='dynamic-h4'>Thanks to our Supporters!</h1>}
            <p className='text-center' style={{ paddingBottom: '1rem' }}>
              Operation Spark is a 501(c)3 not-for-profit
            </p>

            {!logos.length ? null : (
              <div>
                {logos.map(({ name, url, logoDark, logoLight, width }, i) => (
                  <a
                    key={name + i}
                    href={url}
                    target='_blank'
                    rel='noreferrer'
                    style={{ padding: '0 1rem', marginLeft: 0 }}
                    className='anchor'
                  >
                    <Img
                      width={50 * width}
                      height='100%'
                      alt={name}
                      title={name}
                      src={theme.colorMode === 'light' ? logoLight : logoDark}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </SupportersStyles>
        <h3 className='dynamic-h3 mb0 text-center'>Follow Us!</h3>
        <p className='text-center'>#OperationSpark</p>

        <SocialNetworks />

        <div className='opspark-marker'>
          <Img
            alt='Operation Spark'
            src={theme.isLightMode ? '/images/logo-mark.webp' : '/images/logo-mark-dark.webp'}
            width={40}
          />
        </div>

        <div className='report-fraud'>
          <a
            href='https://www.lla.la.gov/report-fraud'
            rel='external nofollow noopener noreferrer'
            target='_blank'
          >
            <Img
              className='report-fraud-img'
              src='/images/logos/etc/louisiana-legislative-auditor-report-light.png'
              alt='Report Fraud'
            />
          </a>
          <div className='fraud-link'>
            <a
              className='anchor right-arr-left'
              href='https://www.lla.la.gov/report-fraud'
              rel='external nofollow noopener noreferrer'
              target='_blank'
            >
              Report fraud, waste, or abuse.
            </a>
          </div>
        </div>
        <div className='powered-by'>
          <a
            href='https://vercel.com/?utm_source=operation-spark&utm_campaign=oss'
            target='_blank'
            rel='noreferrer'
          >
            <Image
              src='/images/logos/etc/vercel_banner.svg'
              width={159}
              height={33}
              alt='Powered By Vercel'
              style={{ filter: `invert(${theme.isLightMode ? 0 : 1})` }}
            />
          </a>
        </div>
      </div>

      <div className='privacy-copyright'>
        <p aria-label='Copyright 2022 Operation Spark'>&copy; 2024 Operation Spark</p>
        <p aria-label='Privacy Policy'>
          <Link href='/privacyPolicy'>{'Privacy Policy'}</Link>
        </p>
      </div>
    </FooterStyles>
  );
};

export default Footer;

const FooterStyles = styled.footer`
  padding: 0;
  @media print {
    text-align: center;
  }

  .report-fraud {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
  }
  .report-fraud-img {
    width: 75px;
    height: auto;
    border-radius: 0.5rem;
  }
  .content {
    padding-bottom: 0;
  }
  .powered-by {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .privacy-copyright {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: ${({ theme }) => theme.alpha.fg50};
    font-weight: 400;
    font-size: 0.8rem;
    padding: 0.5rem;
    a {
      color: ${({ theme }) => theme.alpha.fg50};
    }
  }
  .opspark-marker {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 60px;
      height: auto;
    }
  }
`;

export const InfoSessionStyles = styled(motion.div)`
  display: flex;
  flex-flow: column;
  align-items: center;
  background: ${({ theme }) => theme.primary[600]};
  position: relative;
  padding: 2rem 0;
  box-shadow: 0 -0.25rem 0.5rem rgba(25, 25, 25, 0.25);
  @media print {
    display: none;
    * {
      display: none;
    }
  }
`;

export const SupportersStyles = styled(motion.div)`
  img,
  a {
    user-select: none;
    -webkit-user-drag: none;
  }
`;
