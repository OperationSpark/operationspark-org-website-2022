import { AnimatePresence, motion } from 'framer-motion';
import { MouseEvent } from 'react';
import { IoMdClose } from 'react-icons/io';

import styled from 'styled-components';

const ClearButtonStyles = styled(motion.div)`
  position: absolute;
  overflow: hidden;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  padding: 0 0.5rem;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  color: ${({ theme: { grey } }) => grey[500]};

  button {
    transition: transform 125ms;
  }
  button:hover {
    transform: scale(1.2) !important;
    color: ${({ theme: { red, isLightMode } }) => (isLightMode ? red[0] : red[300])};
  }
  button:active {
    transform: scale(0.9);
  }
  button:focus-visible {
    outline: 2px solid ${({ theme }) => theme.secondary[800]};
  }
`;

interface ClearButtonProps {
  show: boolean;
  onClick: () => void;
}
const ClearButton = ({ show, onClick }: ClearButtonProps) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  return (
    <AnimatePresence>
      {show && (
        <ClearButtonStyles>
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            title='Clear input'
            aria-label='Clear input'
            tabIndex={-1}
          >
            <IoMdClose size={22} />
          </motion.button>
        </ClearButtonStyles>
      )}
    </AnimatePresence>
  );
};

export default ClearButton;
