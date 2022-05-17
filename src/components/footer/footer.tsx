// Logo sheet - https://docs.google.com/spreadsheets/d/1NomIolcAQIPH4c6SCdfuZsm0Geqv6vjvzKp8yohQ-kU/edit

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { VStack, HStack, Text } from '@chakra-ui/react';
import { useTheme } from 'styled-components';
import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';

import Subscribe from './subscribe';
import { SlashDivider } from '@this/components/Elements/SlashDivider';
import NavLink from '@this/components/Navbar/elements/NavLink';

import {
  InfoSessionStyles,
  FooterStyles,
  SupportersStyles,
  SocialStyles,
} from './FooterStyles';

import { ILogo } from '@this/data/types/logos';
import rgbDataURL from '@this/src/helpers/rgbDataURL';

const networkingIcons = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/opspark',
    Icon: FaFacebookSquare,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/OperationSpark',
    Icon: FaTwitter,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/operationspark/',
    Icon: FaInstagram,
  },
  { name: 'Github', url: 'https://github.com/OperationSpark', Icon: FaGithub },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/school/operation-spark/',
    Icon: FaLinkedin,
  },
];

interface FooterProps {
  logos: ILogo[];
}

const Footer = ({ logos }: FooterProps) => {
  const theme = useTheme();
  const { pathname } = useRouter();

  const isInfoSessionPage = pathname.includes('infoSession');
  const isHighschoolPage = pathname.includes('highschool');

  const networkingIconColor = theme.isLightMode
    ? theme.primary[700]
    : theme.primary[300];

  const fadedGreyTextColor = theme.isLightMode
    ? theme.grey[600]
    : theme.grey[500];

  return (
    <FooterStyles>
      {!isInfoSessionPage && !isHighschoolPage ? (
        <InfoSessionStyles justify='center'>
          <Text
            as='h2'
            pb='1rem'
            className='dynamic-h2'
            color='brand.secondary.400'
          >
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
          <VStack
            justify='space-between'
            borderColor='brand.purple.900'
            borderBottom='1px'
          >
            <h1 className='dynamic-h4'>Thanks to our Supporters!</h1>
            <Text color={fadedGreyTextColor}>
              Operation Spark is a 501(c)3 not-for-profit.
            </Text>
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
          </VStack>
        </SupportersStyles>

        <SocialStyles justify='space-around' p='1rem'>
          <Text className='dynamic-txt'>Follow Us!</Text>
          <Text color={fadedGreyTextColor}>#OperationSpark</Text>

          <HStack textAlign='center' justifyContent='center' w='100%'>
            {networkingIcons.map(({ Icon, url, name }) => (
              <a
                key={url}
                aria-label={name}
                href={url}
                rel='noreferrer'
                target='_blank'
                title={name}
                className='anchor'
              >
                <Icon name={name} size={32} color={networkingIconColor} />
              </a>
            ))}
          </HStack>
        </SocialStyles>
      </VStack>

      <HStack justify='center' w='100%' padding='0 0.25rem' userSelect='none'>
        <div style={{ width: '40px', height: '30px', position: 'relative' }}>
          <Image
            alt=''
            layout='fill'
            objectFit='contain'
            src={
              theme.isLightMode
                ? '/images/logo-mark.webp'
                : '/images/logo-mark-dark.webp'
            }
          />
        </div>
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
