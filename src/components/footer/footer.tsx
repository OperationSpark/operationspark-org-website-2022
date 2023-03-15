// Logo sheet - https://docs.google.com/spreadsheets/d/1NomIolcAQIPH4c6SCdfuZsm0Geqv6vjvzKp8yohQ-kU/edit

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { VStack, HStack, Text } from '@chakra-ui/react';
import { useTheme } from 'styled-components';

import { SlashDivider } from '@this/components/Elements/SlashDivider';
import NavLink from '@this/components/Navbar/elements/NavLink';
import { ILogo } from '@this/data/types/logos';
import rgbDataURL from '@this/src/helpers/rgbDataURL';
import SocialNetworks from '@this/components/Elements/SocialNetworks';

import { InfoSessionStyles, FooterStyles, SupportersStyles } from './FooterStyles';
import Subscribe from './subscribe';
import COEBox from './COEBox';

interface FooterProps {
  logos: ILogo[];
}

const Footer = ({ logos }: FooterProps) => {
  const theme = useTheme();
  const { pathname } = useRouter();

  const isInfoSessionPage = pathname.includes('infoSession');
  const isHighschoolPage = pathname.includes('highschool');

  const fadedGreyTextColor = theme.isLightMode ? theme.grey[600] : theme.grey[500];

  return (
    <FooterStyles>
      <COEBox />
      {!isInfoSessionPage && !isHighschoolPage ? (
        <InfoSessionStyles justify='center'>
          <Text as='h2' pb='1rem' className='dynamic-h2' color='brand.secondary.400'>
            ATTEND A FREE INFO SESSION
          </Text>
          <NavLink className='info' href='/infoSession'>
            Register Now
          </NavLink>
        </InfoSessionStyles>
      ) : null}
      <SlashDivider />

      <Subscribe />
      <VStack w='100%' className='content' pb='0'>
        <SupportersStyles w='100%'>
          <VStack justify='space-between' borderColor='brand.purple.900' borderBottom='1px'>
            {logos.length && <h1 className='dynamic-h4'>Thanks to our Supporters!</h1>}
            <Text color={fadedGreyTextColor}>Operation Spark is a 501(c)3 not-for-profit.</Text>

            {logos.length && (
              <HStack
                flexWrap='wrap'
                justifyContent='space-around'
                className='supporter-logos'
                paddingBottom='1rem'
              >
                {logos.map(({ name, url, logoDark, logoLight, width }, i) => (
                  <a
                    key={name + i}
                    href={url}
                    target='_blank'
                    rel='noreferrer'
                    style={{ padding: '0 1rem', marginLeft: 0 }}
                    className='anchor'
                  >
                    <Image
                      width={50 * width}
                      height='100%'
                      objectFit='contain'
                      layout='fixed'
                      alt={name}
                      title={name}
                      src={theme.colorMode === 'light' ? logoLight : logoDark}
                      placeholder='blur'
                      blurDataURL={rgbDataURL()}
                    />
                  </a>
                ))}
              </HStack>
            )}

            <a
              className='anchor right-arr-left fraud-link'
              href='https://www.reportfraud.la/'
              rel='external nofollow noopener noreferrer'
              target='_blank'
            >
              Report fraud, waste, or abuse.
            </a>
          </VStack>
        </SupportersStyles>
        <Text className='dynamic-txt'>Follow Us!</Text>
        <Text color={fadedGreyTextColor}>#OperationSpark</Text>

        <SocialNetworks />
      </VStack>

      <HStack justify='center' w='100%' padding='0 0.25rem' userSelect='none'>
        <div style={{ width: '40px', height: '30px', position: 'relative' }}>
          <Image
            alt=''
            layout='fill'
            objectFit='contain'
            src={theme.isLightMode ? '/images/logo-mark.webp' : '/images/logo-mark-dark.webp'}
          />
        </div>
      </HStack>
      <HStack justify='center' align='center' w='100%' padding='0.5rem 0'>
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
      </HStack>
      <HStack justify='space-between' w='100%' padding='0 0.25rem'>
        <Text
          w='50%'
          fontSize='sm'
          color={fadedGreyTextColor}
          aria-label='Copyright 2022 Operation Spark'
        >
          &copy; 2022 Operation Spark
        </Text>
        <Text
          w='50%'
          fontSize='sm'
          textAlign='right'
          color={fadedGreyTextColor}
          aria-label='Privacy Policy'
        >
          <Link href='/privacyPolicy'>Our privacy policy</Link>
        </Text>
      </HStack>
    </FooterStyles>
  );
};

export default Footer;
