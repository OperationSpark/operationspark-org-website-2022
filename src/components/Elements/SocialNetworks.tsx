import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { FaFacebookSquare, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

const SocialNetworks = () => {
  const theme = useTheme();
  const networkingIconColor = theme.isLightMode ? theme.primary[700] : theme.primary[300];

  return (
    <SocialStyles>
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
    </SocialStyles>
  );
};

export default SocialNetworks;

const SocialStyles = styled(motion.div)`
  padding: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  img,
  a {
    user-select: none;
    -webkit-user-drag: none;
  }
`;
