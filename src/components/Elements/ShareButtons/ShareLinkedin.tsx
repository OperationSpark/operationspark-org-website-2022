import { motion } from 'framer-motion';
import { FC } from 'react';
import styled from 'styled-components';

import { FaLinkedin, FaShare } from 'react-icons/fa';

// import { FaFacebookSquare, FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';

type ShareOnLinkedinButtonProps = {
  url: string;
  title: string;
  summary: string;
  source: string;
};

const ShareOnLinkedinButton: FC<ShareOnLinkedinButtonProps> = ({ url, title, summary, source }) => {
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}&source=${source}`;
  return (
    <ShareOnLinkedinStyles href={linkedinUrl} target='_blank' title='Share on LinkedIn'>
      <FaLinkedin size={20} />
      <span>Share </span>
      <FaShare size={20} />
    </ShareOnLinkedinStyles>
  );
};

const ShareOnLinkedinStyles = styled(motion.a)`
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

export default ShareOnLinkedinButton;
