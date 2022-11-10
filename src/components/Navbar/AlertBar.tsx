import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { IoMdCloseCircleOutline as CloseIcon } from 'react-icons/io';

import { Zap } from '@this/components/Elements/ZapIcon';
import { IAlert } from '@this/data/types/bits';

const AlertBarStyles = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0.25rem;
  overflow: hidden;
  user-select: none;
  background: ${({ theme: { secondary } }) =>
    `linear-gradient(0deg,
      ${secondary[700]} 0%,
      ${secondary[400]} 8%,
      ${secondary[400]} 92%,
      ${secondary[700]} 100%
      )`};
  color: rgba(25, 25, 25, 1);
  font-weight: 600;
  transform-origin: top center;

  .alert-message {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 0.9em;
    margin-right: 0.5rem;
    a {
      padding: 0 0.5rem;
      border-radius: 0.5rem;
      transition: background-color 100ms, box-shadow 250ms, border-radius 250ms;
    }
    a:hover {
      background: ${({ theme: { secondary } }) => secondary[300]};
      box-shadow: 0 0 6px rgba(25, 25, 25, 0.5);
    }
    a:active {
      transition: background-color 50ms, box-shadow 50ms, border-radius 50ms;
      background: ${({ theme: { secondary } }) => secondary[500]};
      box-shadow: 0 0 2px rgba(25, 25, 25, 0.75);
    }
  }
`;

const AlertBar = ({ info }: { info: IAlert }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const setStatusOpen = () => {
    localStorage.setItem(
      'alertBar',
      JSON.stringify({
        open: true,
        time: null,
      }),
    );
    return setIsOpen(true);
  };

  useEffect(() => {
    const alertStatus = localStorage.getItem('alertBar');
    if (!alertStatus) {
      return setStatusOpen();
    }
    try {
      const { open, time } = JSON.parse(alertStatus);

      // Set 1 hour timeout before showing the alert bar again (on page reload)
      const timeInterval = 1000 * 60 * 60;

      if (open || Date.now() - time > timeInterval) {
        return setIsOpen(true);
      }
    } catch {
      return setStatusOpen();
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(
      'alertBar',
      JSON.stringify({
        open: false,
        time: Date.now(),
      }),
    );
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <AlertBarStyles
          exit={{
            y: -50,
            opacity: 0,
          }}
          transition={{ type: 'tween' }}
          className='dynamic-txt'
        >
          <div className='alert-message'>
            <Zap size={0.9} />
            {info.url ? (
              <a
                href={info.url}
                target={info.url.startsWith('http') ? '_blank' : undefined}
                rel='noreferrer'
              >
                {info.message}
              </a>
            ) : (
              info.message
            )}
          </div>
          <motion.button
            className='alert-close-btn'
            whileHover={{ translateY: -2, color: theme.secondary[900] }}
            whileTap={{ translateY: 0 }}
            transition={{ type: 'tween', duration: 0.1 }}
            onClick={handleClose}
            name='Close alert bar'
            aria-label='Close alert bar'
          >
            <CloseIcon size={25} />
          </motion.button>
        </AlertBarStyles>
      )}
    </AnimatePresence>
  );
};

export default AlertBar;
