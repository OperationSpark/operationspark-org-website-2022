import styled, { useTheme } from 'styled-components';

import { motion } from 'framer-motion';
import { BsCheckCircleFill } from 'react-icons/bs';

const ReqStatusStyles = styled(motion.div)`
  font-size: 0.6rem;
  position: absolute;
  right: 0.25rem;
  top: 0.25rem;
  line-height: 1em;
  user-select: none;
  pointer-events: none;
  font-weight: 400;
  font-size: 0.6rem;
  color: ${({ theme }) => (theme.isLightMode ? theme.red[600] : theme.red[400])};
`;

interface RequiredStatusProps {
  isValid: boolean;
}

const RequiredStatus = ({ isValid }: RequiredStatusProps) => {
  const theme = useTheme();
  const successColor = theme.isLightMode ? theme.green[500] : theme.green[400];
  const invalidColor = theme.isLightMode ? theme.red[400] : theme.red[300];

  return (
    <ReqStatusStyles
      initial={{ opacity: 0, color: theme.grey[400] }}
      animate={{
        opacity: 1,
        color: isValid ? successColor : invalidColor,
        x: isValid ? 10 : 0,
        y: isValid ? -10 : 0,
        filter: isValid
          ? 'drop-shadow(0 0 2px rgba(25, 25, 25, 0.75))'
          : 'drop-shadow(0 0 2px rgba(25, 25, 25, 0))',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, color: { duration: 0 } }}
    >
      {!isValid ? 'Required' : <BsCheckCircleFill size={20} />}
    </ReqStatusStyles>
  );
};

export default RequiredStatus;
