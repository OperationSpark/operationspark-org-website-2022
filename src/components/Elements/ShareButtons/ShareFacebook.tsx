import { motion } from 'framer-motion';
import { FC } from 'react';
import styled from 'styled-components';

import { FaFacebookSquare, FaShare } from 'react-icons/fa';

// import { , FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

type ShareOnFacebookButtonProps = {
  url: string;
};

const ShareOnFacebookButton: FC<ShareOnFacebookButtonProps> = ({ url }) => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  return (
    <ShareOnFacebookStyles href={facebookUrl} target='_blank' title='Share on Facebook'>
      <FaFacebookSquare size={20} />
      <span>Share </span>
      <FaShare size={20} />
    </ShareOnFacebookStyles>
  );
};

const ShareOnFacebookStyles = styled(motion.a)`
  background: ${({ theme }) => theme.primary[theme.isLightMode ? 700 : 300]};
  color: ${({ theme }) => theme.bg};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  gap: 0.4rem;
  :hover {
    background: ${({ theme }) => theme.primary[theme.isLightMode ? 400 : 200]};
  }
`;

export default ShareOnFacebookButton;
