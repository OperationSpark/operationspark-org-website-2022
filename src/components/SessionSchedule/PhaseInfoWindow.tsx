import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineInfoCircle as InfoIcon } from 'react-icons/ai';
import { IoMdCloseCircle as CloseIcon } from 'react-icons/io';

import { CourseSessions } from '@this/data/types/schedule';
import { useClickAway } from '@this/src/hooks/useClickAway';
import CursorTooltip from '@this/src/Typography/elements/CursorTooltip';

type PhaseInfoWindowProps = {
  phase: CourseSessions;
};

export const PhaseInfoWindow = ({ phase }: PhaseInfoWindowProps) => {
  const [iconRef, isOpen, setOpen] = useClickAway();
  const { cost, days, hours, length, preReqs, title, description } = phase;

  const dayRange = `${days[0]} - ${days[days.length - 1]}`;

  const CloseOrInfoIcon = isOpen ? CloseIcon : InfoIcon;

  return (
    <PhaseInfoWindowStyles ref={iconRef}>
      <div className='course-info-container'>
        <button className={`info-icon ${isOpen ? 'open' : ''}`} onClick={() => setOpen(!isOpen)}>
          {isOpen ? (
            <CloseIcon size={20} />
          ) : (
            <CursorTooltip title={`${title} Details`}>
              <CloseOrInfoIcon size={20} />
            </CursorTooltip>
          )}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='course-info'
              initial={{ y: '-50%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-50%', opacity: 0 }}
              transition={{ type: 'tween', duration: 0.15 }}
            >
              <div className='course-info-section'>
                <p className='primary-secondary bold'> {title}</p>
              </div>
              <div className='course-info-section'>
                <p className='dim italic'> {length}</p>
              </div>
              <div className='course-info-section'>
                <p className='dim bold'>{dayRange}</p>
                {hours.map((hour) => (
                  <p className='dim' key={hour}>
                    {hour}
                  </p>
                ))}
              </div>
              <div className='course-info-section'>
                <p className='dim bold italic'>{cost}</p>
              </div>
              <div className='course-info-section'>
                <p className='dim bold'>Prerequisites</p>
                <p className='dim italic'>{preReqs}</p>
              </div>
              <div className='phase-description'>
                <p className='dim bold text-center'>About {title}</p>
                <div className='phase-description-scroll'>{description}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PhaseInfoWindowStyles>
  );
};

const PhaseInfoWindowStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: calc(100% - 1rem);
  margin: 0 0.5rem;
  display: flex;
  justify-content: center;
  z-index: 100;

  .course-info-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    padding: 0.5rem;
  }
  .info-icon {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: fit-content;
    color: ${({ theme }) => (theme.isLightMode ? theme.primary[0] : theme.secondary[0])};
    :hover,
    &.open {
      z-index: 101;
    }
    :hover {
      color: ${({ theme }) => (theme.isLightMode ? theme.grey[600] : theme.grey[300])};
    }
    &.open {
      color: ${({ theme }) => (theme.isLightMode ? theme.red[300] : theme.red[300])};
      :hover {
        color: ${({ theme }) => (theme.isLightMode ? theme.red[500] : theme.red[400])};
      }
    }
    :focus-visible {
      outline: 2px solid ${({ theme }) => theme.secondary[800]};
    }
  }
  .course-info {
    overflow: hidden;

    top: 0;
    z-index: 100;
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    background: ${({ theme }) => theme.bg};

    backdrop-filter: blur(8px);
    box-shadow: 0 0 0.25rem ${({ theme }) => theme.alpha.fg50};
    border-radius: 0.25rem;
    padding: 0.5rem 0;
    padding-bottom: 0;
    .dim {
      color: ${({ theme }) => (theme.isLightMode ? theme.grey[600] : theme.grey[400])};
    }
    p.bold {
      font-weight: 700;
    }
    p.italic {
      font-style: italic;
    }
    .course-info-section {
      padding: 0.25rem 0;
      text-align: center;
      :first-of-type {
        padding-top: 0;
      }
      :last-of-type {
        padding-bottom: 0;
      }
    }
    .phase-description {
      padding-top: 0.5rem;

      .phase-description-scroll {
        max-height: 200px;
        overflow-y: auto;
        line-height: 1.25em;
        padding: 0.5rem;
        ::-webkit-scrollbar {
          box-shadow: none;
          background: none;
        }
        box-shadow: 0 0 2px ${({ theme }) => theme.alpha.fg25} inset;
      }
    }
  }
`;
