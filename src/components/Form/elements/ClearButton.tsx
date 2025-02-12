import { AnimatePresence, motion } from 'framer-motion';
import { MouseEvent } from 'react';
import { IoMdClose } from 'react-icons/io';

import styled from 'styled-components';

interface ClearButtonProps {
  show: boolean;
  onClick: () => void;
  testId?: string;
}
const ClearButton = ({ show, onClick, testId }: ClearButtonProps) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    onClick();
  };

  return (
    <AnimatePresence>
      {show && (
        <ClearButtonStyles>
          <motion.button
            initial={{ opacity: 0, x: 10, scale: 0.25 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.1 }}
            transition={{ duration: 0.1 }}
            onClick={handleClick}
            title='Clear input'
            aria-label='Clear input'
            tabIndex={-1}
            data-test-id={testId ?? 'clear-input-button'}
            whileHover={{ scale: 1.1, opacity: 1 }}
            whileTap={{ scale: 0.9, opacity: 0.8 }}
          >
            <IoMdClose size={22} />
          </motion.button>
        </ClearButtonStyles>
      )}
    </AnimatePresence>
  );
};

export default ClearButton;

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

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.rgb('fg', 0.25)};
    transition: all 225ms;
    &:hover {
      color: ${({ theme }) => theme.rgb('fg', 0.75)};
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;
